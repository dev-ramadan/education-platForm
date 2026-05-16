import VideoPlayer from "../user/VideoPlayer";

/**
 * VideoSection — قسم عرض الدرس (فيديو + تفاصيل + زر إنجاز)
 */
export default function VideoSection({ lesson, course, completedLessons, onMarkComplete }) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <h1 className="text-3xl font-black text-slate-800 mb-6">{lesson.title}</h1>

      <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 relative group">
        {lesson.video_url?.includes("youtube") ? (
          <iframe
            className="w-full h-full"
            src={lesson.video_url.replace("watch?v=", "embed/")}
            title={lesson.title}
            allowFullScreen
          />
        ) : (
          <VideoPlayer url={lesson.video_url} title={lesson.title} />
        )}
      </div>

      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-bold text-xl mb-2 text-slate-800">تفاصيل الدرس</h3>
          <p className="text-slate-600 leading-relaxed">
            هذا الدرس جزء من كورس {course.title}. يرجى مشاهدة الفيديو بالكامل لضمان استيعابك
            للمعلومات.
          </p>
        </div>
        <button
          onClick={() => onMarkComplete(lesson.id)}
          disabled={completedLessons.includes(lesson.id)}
          className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-md ${
            completedLessons.includes(lesson.id)
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1"
          }`}
        >
          {completedLessons.includes(lesson.id) ? "✅ تم الإنجاز" : "تحديد كمكتمل"}
        </button>
      </div>
    </div>
  );
}
