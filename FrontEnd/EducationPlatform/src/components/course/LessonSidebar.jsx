/**
 * LessonSidebar — الشريط الجانبي لمحتوى الكورس (دروس + امتحانات + تقدم)
 */
export default function LessonSidebar({
  course,
  completedLessons,
  currentItem,
  currentType,
  progressPercent,
  isCompleted,
  onSelectLesson,
  onSelectQuiz,
  onShowCertificate,
}) {
  return (
    <div className="w-full md:w-80 bg-white border-l border-slate-200 p-6 overflow-y-auto hidden md:block z-10 shadow-lg">
      <h2 className="text-xl font-black text-slate-800 mb-4">محتوى الكورس</h2>

      {/* Progress Bar */}
      <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
          <span>نسبة الإنجاز</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {isCompleted && (
          <button
            onClick={onShowCertificate}
            className="mt-3 w-full bg-yellow-500 text-white font-bold py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors shadow-sm"
          >
            🎓 عرض الشهادة
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Lessons */}
        <div>
          <h3 className="font-bold text-slate-600 mb-2 flex items-center gap-2">
            <span>📚</span> الدروس
          </h3>
          <div className="space-y-2">
            {course.Lessons?.map((lesson) => {
              const isComplete = completedLessons.includes(lesson.id);
              const isActive = currentType === "lesson" && currentItem?.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className={`w-full text-right p-3 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-blue-50 border-blue-500 border text-blue-700 font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="truncate pr-2">{lesson.title}</span>
                  {isComplete && <span className="text-green-500 font-bold text-lg">✓</span>}
                </button>
              );
            })}
            {(!course.Lessons || course.Lessons.length === 0) && (
              <p className="text-sm text-slate-500">لا توجد دروس حالياً</p>
            )}
          </div>
        </div>

        {/* Quizzes */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-600 mb-2 flex items-center gap-2">
            <span>📝</span> الامتحانات
          </h3>
          <div className="space-y-2">
            {course.Quizzes?.map((exam) => {
              const isActive = currentType === "quiz" && currentItem?.id === exam.id;
              return (
                <div
                  key={exam.id}
                  onClick={() => onSelectQuiz(exam)}
                  className={`w-full text-right p-3 rounded-xl transition-all cursor-pointer flex justify-between items-center ${
                    isActive
                      ? "bg-purple-100 border-purple-500 border text-purple-900 font-bold"
                      : "bg-purple-50 border border-purple-100 text-purple-800 hover:bg-purple-100"
                  }`}
                >
                  <span>{exam.title}</span>
                  <span className="text-xs bg-purple-200 px-2 py-1 rounded-full">ابدأ</span>
                </div>
              );
            })}
            {(!course.Quizzes || course.Quizzes.length === 0) && (
              <p className="text-sm text-slate-500">لا توجد امتحانات حالياً</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
