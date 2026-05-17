/**
 * LessonSidebar — الشريط الجانبي لمحتوى الكورس (دروس + امتحانات + تقدم)
 */
export default function LessonSidebar({
  course,
  completedLessons,
  lessonProgress = {},
  currentItem,
  currentType,
  progressPercent,
  isCompleted,
  onSelectLesson,
  onSelectQuiz,
  onShowCertificate,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl transition-transform duration-300 overflow-y-auto p-6 md:translate-x-0 md:static md:z-10 md:shadow-lg md:block md:w-80 border-l border-slate-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex justify-between items-center md:hidden mb-6 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-800">محتوى الكورس</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
            title="إغلاق القائمة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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
              const lessonPercent = isComplete ? 100 : (lessonProgress[lesson.id] || 0);
              const isActive = currentType === "lesson" && currentItem?.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className={`w-full text-right p-3 rounded-xl transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? "bg-blue-50 border-blue-500 border text-blue-700 font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="truncate pr-2 flex-1 text-sm">{lesson.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isComplete 
                        ? "bg-green-100 text-green-700" 
                        : lessonPercent > 0 
                          ? "bg-blue-100 text-blue-700 animate-pulse" 
                          : "bg-slate-200 text-slate-500"
                    }`}>
                      {lessonPercent}%
                    </span>
                    {isComplete && <span className="text-green-500 font-bold text-base">✓</span>}
                  </div>
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
  </>
  );
}
