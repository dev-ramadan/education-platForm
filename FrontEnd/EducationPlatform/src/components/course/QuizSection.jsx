import { formatTime } from "../../utils/formatters";

/**
 * QuizSection — قسم الامتحان (أسئلة + خيارات + تايمر + نتيجة)
 */
export default function QuizSection({
  quiz,
  answers,
  quizSubmitted,
  quizScore,
  timeLeft,
  onOptionSelect,
  onSubmit,
}) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Header + Timer */}
      <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md pb-4 pt-2 border-b border-slate-200 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800">{quiz.title}</h1>
          <p className="text-slate-500">مدة الامتحان المحددة: {quiz.duration} دقيقة</p>
        </div>
        {!quizSubmitted && (
          <div
            className={`px-6 py-3 rounded-2xl font-black text-2xl tracking-widest shadow-sm border ${
              timeLeft < 60
                ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                : "bg-white text-slate-800 border-slate-200"
            }`}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Score Card */}
      {quizSubmitted && (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl mb-8 text-center animate-slide-up">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-black mb-2">نتيجة الامتحان</h2>
          <p className="text-5xl font-black mb-4">
            {quizScore}{" "}
            <span className="text-2xl text-purple-200">/ {quiz.Questions?.length || 0}</span>
          </p>
          <p className="text-purple-100">
            {quizScore === quiz.Questions?.length
              ? "ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح."
              : "عمل رائع! يمكنك مراجعة الإجابات الصحيحة بالأسفل."}
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="glass p-8 rounded-2xl shadow-lg">
        {quiz.Questions && quiz.Questions.length > 0 ? (
          <div className="space-y-8">
            {quiz.Questions.map((q, i) => {
              const selectedOptionId = answers[q.id];
              const correctOption = q.Options?.find((o) => o.correct_answer);
              return (
                <div key={q.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {i + 1}. {q.question}
                  </h3>
                  <div className="space-y-3 pl-4">
                    {q.Options?.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      const isCorrect = opt.correct_answer;
                      const optionStyle = quizSubmitted
                        ? isCorrect
                          ? "bg-green-100 border-green-500 text-green-800 font-bold"
                          : isSelected
                          ? "bg-red-100 border-red-500 text-red-800"
                          : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                        : isSelected
                        ? "bg-indigo-50 border-indigo-400 text-indigo-800"
                        : "hover:bg-slate-50 hover:border-slate-300 cursor-pointer text-slate-700";
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={opt.id}
                            checked={isSelected}
                            disabled={quizSubmitted}
                            onChange={() => onOptionSelect(q.id, opt.id)}
                            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                          />
                          <span className="flex-1">{opt.option}</span>
                          {quizSubmitted && isCorrect && (
                            <span className="text-green-600 font-bold text-lg">✓</span>
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <span className="text-red-600 font-bold text-lg">✗</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {!quizSubmitted && (
              <button
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all text-lg"
              >
                تسليم الإجابات
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="text-5xl mb-4 opacity-50">🤷‍♂️</div>
            <p className="text-xl font-bold text-slate-600 mb-2">لا توجد أسئلة في هذا الامتحان!</p>
          </div>
        )}
      </div>
    </div>
  );
}
