import { useState } from "react";
import useCourseDetails from "../hooks/useCourseDetails";
import useProgress from "../hooks/useProgress";
import useQuiz from "../hooks/useQuiz";
import LessonSidebar from "../components/course/LessonSidebar";
import VideoSection from "../components/course/VideoSection";
import QuizSection from "../components/course/QuizSection";
import CertificateModal from "../components/course/CertificateModal";
import SubscribeModal from "../components/course/SubscribeModal";
import StarRating from "../components/common/StarRating";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function CourseDetails() {
  const { course, instructor, loading, error, isEnrolled, enrollmentData } = useCourseDetails();

  const [activeItem, setActiveItem] = useState(null);
  const [activeType, setActiveType] = useState("lesson");
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const { completedLessons, markComplete } = useProgress(enrollmentData, course?.id);
  const { answers, quizSubmitted, quizScore, timeLeft, handleOptionSelect, handleSubmit } =
    useQuiz(activeItem, activeType);

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <p className="text-center text-red-500 mt-10 text-xl font-bold">{error}</p>;
  if (!course) return <p className="text-center mt-10 text-xl font-bold">الكورس غير موجود</p>;

  // ── واجهة الطالب المشترك ──
  if (isEnrolled === "active") {
    const totalLessons = course.Lessons?.length || 0;
    const progressPercent =
      totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    const isCompleted = progressPercent === 100 && totalLessons > 0;

    const currentItem = activeItem || course.Lessons?.[0];
    const currentType = activeItem ? activeType : course.Lessons?.length > 0 ? "lesson" : "none";

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-20" dir="rtl">
        <LessonSidebar
          course={course}
          completedLessons={completedLessons}
          currentItem={currentItem}
          currentType={currentType}
          progressPercent={progressPercent}
          isCompleted={isCompleted}
          onSelectLesson={(lesson) => { setActiveItem(lesson); setActiveType("lesson"); }}
          onSelectQuiz={(quiz) => { setActiveItem(quiz); setActiveType("quiz"); }}
          onShowCertificate={() => setShowCertificate(true)}
        />

        <div className="flex-1 p-4 md:p-8 overflow-y-auto relative">
          {currentType === "lesson" && currentItem ? (
            <VideoSection
              lesson={currentItem}
              course={course}
              completedLessons={completedLessons}
              onMarkComplete={markComplete}
            />
          ) : currentType === "quiz" && currentItem ? (
            <QuizSection
              quiz={currentItem}
              answers={answers}
              quizSubmitted={quizSubmitted}
              quizScore={quizScore}
              timeLeft={timeLeft}
              onOptionSelect={handleOptionSelect}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-xl font-bold">
              اختر درساً أو امتحاناً من القائمة لتبدأ التعلم
            </div>
          )}
        </div>

        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          course={course}
          instructor={instructor}
        />
      </div>
    );
  }

  // ── واجهة تفاصيل الكورس (غير مشترك) ──
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10">

        {/* Course Info */}
        <div className="md:col-span-2 space-y-8 animate-slide-up">
          <div className="glass p-8 rounded-3xl">
            <h1 className="text-4xl font-black text-slate-800 mb-4">{course.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={course.rating || 4.5} />
              <span className="text-slate-600 font-bold">{course.rating || 4.5} تقييم</span>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">{course.description}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">ماذا ستتعلم في هذا الكورس؟</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["محتوى علمي حديث", "تطبيق عملي", "شهادة معتمدة", "متابعة مستمرة"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <span className="text-green-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="md:col-span-1 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="glass-dark p-6 rounded-3xl sticky top-28 border-t-4 border-t-blue-500">
            <div className="text-center mb-6">
              <div className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {course.price} ج.م
              </div>
              <p className="text-slate-300 text-sm">ادفع مرة واحدة وتملك الكورس للأبد</p>
            </div>

            {isEnrolled === "pending" ? (
              <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-xl text-center font-bold border border-yellow-500/30">
                طلبك قيد المراجعة ⏳
              </div>
            ) : isEnrolled === "rejected" ? (
              <div className="bg-red-500/20 text-red-300 p-4 rounded-xl text-center font-bold border border-red-500/30">
                تم رفض الطلب ❌
              </div>
            ) : (
              <button
                onClick={() => setShowSubscribe(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 transition-all"
              >
                اشترك الآن
              </button>
            )}

            {instructor && (
              <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <p className="font-bold text-slate-100">{instructor.name}</p>
                  <p className="text-sm text-slate-400">{instructor.title || "محاضر"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
        course={course}
      />
    </div>
  );
}