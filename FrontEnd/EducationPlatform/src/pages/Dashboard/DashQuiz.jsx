import { useState, useEffect } from "react";
import { createQuiz, createQuestion, createOptions } from "../../api/quiz.api";
import { fetchCourses } from "../../api/courses.api";
import { useAuth } from "../../hooks/useAuth";

const INITIAL_OPTIONS = [
  { option: "", correct_answer: true },
  { option: "", correct_answer: false },
  { option: "", correct_answer: false },
  { option: "", correct_answer: false },
];

export default function DashQuiz() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [step, setStep] = useState(1);

  // Quiz form
  const [exam, setExam] = useState({ title: "", courseId: "", time: "" });
  const [createdQuizId, setCreatedQuizId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Question form
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [qLoading, setQLoading] = useState(false);

  useEffect(() => {
    fetchCourses().then(setCourses).catch(console.error);
  }, []);

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    if (!exam.title || !exam.courseId || !exam.time) return alert("من فضلك املأ كل البيانات");
    try {
      setLoading(true);
      const data = await createQuiz(
        { title: exam.title, courseId: Number(exam.courseId), time: Number(exam.time) },
        token
      );
      alert(`تم إضافة الامتحان بنجاح ✅ (رقم الامتحان: ${data?.id})`);
      setCreatedQuizId(data?.id);
      setStep(2);
    } catch (err) {
      alert(err.message || "حصل خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const next = [...options];
    next[index] = { ...next[index], option: value };
    setOptions(next);
  };

  const setCorrectOption = (index) => {
    setOptions(options.map((opt, i) => ({ ...opt, correct_answer: i === index })));
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some((o) => !o.option))
      return alert("من فضلك أدخل نص السؤال وجميع الاختيارات الأربعة");
    try {
      setQLoading(true);
      const newQuestion = await createQuestion({ quizId: createdQuizId, question }, token);
      await createOptions({ questionId: newQuestion.id, options }, token);
      alert("تم إضافة السؤال والاختيارات بنجاح ✅");
      setQuestion("");
      setOptions(INITIAL_OPTIONS);
    } catch (err) {
      alert(err.message || "حصل خطأ");
    } finally {
      setQLoading(false);
    }
  };

  const resetToStep1 = () => {
    setStep(1);
    setCreatedQuizId(null);
    setExam({ title: "", courseId: "", time: "" });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
          <span className="text-4xl">🎯</span> نظام إدارة الامتحانات
        </h1>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`px-6 py-2 rounded-full font-bold transition-all ${step === 1 ? "bg-indigo-600 text-white shadow-md" : "bg-slate-200 text-slate-500"}`}>
            1. إنشاء الامتحان
          </div>
          <div className="w-12 h-1 bg-slate-200 rounded-full" />
          <div className={`px-6 py-2 rounded-full font-bold transition-all ${step === 2 ? "bg-purple-600 text-white shadow-md" : "bg-slate-200 text-slate-500"}`}>
            2. إضافة الأسئلة
          </div>
        </div>

        {/* Step 1: Create Quiz */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-slate-800">تفاصيل الامتحان الجديد</h2>
            <form onSubmit={handleExamSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">اسم الامتحان</label>
                <input
                  name="title"
                  value={exam.title}
                  onChange={(e) => setExam({ ...exam, title: e.target.value })}
                  placeholder="مثال: امتحان الشهر الأول"
                  className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">اختيار الكورس</label>
                <select
                  name="courseId"
                  value={exam.courseId}
                  onChange={(e) => setExam({ ...exam, courseId: e.target.value })}
                  className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                >
                  <option value="" disabled>-- اختر الكورس --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">مدة الامتحان (بالدقائق)</label>
                <input
                  name="time"
                  type="number"
                  value={exam.time}
                  onChange={(e) => setExam({ ...exam, time: e.target.value })}
                  placeholder="مثال: 60"
                  className="w-full border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70"
              >
                {loading ? "جاري الحفظ..." : "حفظ الامتحان والانتقال للأسئلة"}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Add Questions */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 animate-fade-in relative">
            <button
              type="button"
              onClick={resetToStep1}
              className="absolute top-6 left-6 text-sm text-red-500 hover:text-red-700 font-bold underline"
            >
              إنشاء امتحان آخر
            </button>
            <h2 className="text-xl font-bold mb-6 text-purple-800 flex items-center gap-2">
              <span className="text-2xl">❓</span> إضافة سؤال للامتحان (ID: {createdQuizId})
            </h2>
            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">نص السؤال</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="اكتب سؤالك هنا..."
                  rows="3"
                  className="w-full border border-purple-200 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-purple-50/30"
                />
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-4">
                  الاختيارات (يرجى تحديد الإجابة الصحيحة)
                </label>
                <div className="space-y-3">
                  {options.map((opt, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-lg border ${
                        opt.correct_answer ? "border-green-400 bg-green-50" : "border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={opt.correct_answer}
                        onChange={() => setCorrectOption(index)}
                        className="w-5 h-5 text-green-600 cursor-pointer"
                        title="اختر هذه كإجابة صحيحة"
                      />
                      <input
                        type="text"
                        value={opt.option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`الاختيار ${index + 1}`}
                        className="flex-1 border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                disabled={qLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70"
              >
                {qLoading ? "جاري الحفظ..." : "حفظ السؤال مع الاختيارات"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}