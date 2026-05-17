import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "../user/VideoPlayer";

/**
 * VideoSection — قسم عرض الدرس (فيديو + تفاصيل + التقدم التلقائي)
 */
export default function VideoSection({ lesson, course, completedLessons, onMarkComplete, onUpdateProgress }) {
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);

  // إعادة ضبط حالة التفعيل عند تغيير الدرس لتجنب تكرار استدعاءات API
  useEffect(() => {
    setHasTriggeredComplete(false);
  }, [lesson.id]);

  const handleMarkComplete = () => {
    if (!completedLessons.includes(lesson.id) && !hasTriggeredComplete) {
      setHasTriggeredComplete(true);
      onMarkComplete(lesson.id);
    }
  };

  const isLessonComplete = completedLessons.includes(lesson.id);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <h1 className="text-3xl font-black text-slate-800 mb-6">{lesson.title}</h1>

      <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 relative group">
        {lesson.video_url?.includes("youtube") || lesson.video_url?.includes("youtu.be") ? (
          <div className="w-full h-full bg-black">
            <ReactPlayer
              url={lesson.video_url}
              width="100%"
              height="100%"
              controls
              onProgress={(state) => {
                const percent = Math.round(state.played * 100);
                if (onUpdateProgress) {
                  onUpdateProgress(lesson.id, percent);
                }
                if (state.played > 0.5) {
                  handleMarkComplete();
                }
              }}
            />
          </div>
        ) : (
          <VideoPlayer 
            url={lesson.video_url} 
            title={lesson.title} 
            onMarkComplete={handleMarkComplete} 
            onProgress={(percent) => {
              if (onUpdateProgress) {
                onUpdateProgress(lesson.id, percent);
              }
            }}
          />
        )}
      </div>

      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2 text-slate-800">تفاصيل الدرس</h3>
          <p className="text-slate-600 leading-relaxed">
            هذا الدرس جزء من كورس "{course.title}". يرجى مشاهدة أكثر من نصف الفيديو لضمان استيعابك للمعلومات وسيتم تحديد الدرس كمكتمل تلقائياً.
          </p>
        </div>
        
        {/* مؤشر تقدم الدرس الجمالي */}
        <div className="w-full md:w-auto">
          {isLessonComplete ? (
            <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 px-5 py-3 rounded-2xl font-black text-base shadow-sm">
              <span className="text-lg">✅</span> تم إنجاز الدرس بنجاح
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 bg-indigo-50/80 text-indigo-700 border border-indigo-100 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm">
              <span className="animate-pulse">⏳</span> التقدم تلقائي (شاهد 50%+ للإنجاز)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
