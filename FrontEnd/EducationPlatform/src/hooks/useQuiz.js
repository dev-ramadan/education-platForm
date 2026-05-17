import { useState, useEffect } from "react";
import { saveQuizResult } from "../api/quiz.api";
import { useAuth } from "./useAuth";

/**
 * useQuiz — منطق الامتحان (إجابات، تايمر، تسليم)
 */
export default function useQuiz(activeItem, activeType) {
  const { token } = useAuth();
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  // إعادة الضبط عند تغيير الامتحان
  useEffect(() => {
    if (activeType === "quiz" && activeItem) {
      setAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
      setTimeLeft((activeItem.duration || 0) * 60);
    }
  }, [activeItem, activeType]);

  // التايمر
  useEffect(() => {
    if (activeType === "quiz" && !quizSubmitted && timeLeft !== null) {
      if (timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
      } else if (timeLeft === 0 && activeItem) {
        handleSubmit();
      }
    }
  }, [timeLeft, activeType, quizSubmitted, activeItem]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (quizSubmitted || !activeItem) return;
    let score = 0;
    activeItem.Questions?.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.Options?.find((o) => o.correct_answer);
      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    try {
      await saveQuizResult({ quizId: activeItem.id, score }, token);
    } catch (err) {
      console.error("Failed to save quiz result:", err);
    }
  };

  return { answers, quizSubmitted, quizScore, timeLeft, handleOptionSelect, handleSubmit };
}
