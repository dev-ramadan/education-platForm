import { BASE_URL } from "./config";


export const createQuiz = async (quizData, token) => {
  const res = await fetch(`${BASE_URL}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(quizData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data;
};

export const createQuestion = async ({ quizId, question }, token) => {
  const res = await fetch(`${BASE_URL}/api/question`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ quizId, question }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "خطأ في إضافة السؤال");
  return data.data;
};

export const createOptions = async ({ questionId, options }, token) => {
  const res = await fetch(`${BASE_URL}/api/option`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ questionId, options }),
  });
  if (!res.ok) throw new Error("تم إضافة السؤال ولكن فشلت إضافة الاختيارات");
};

export const saveQuizResult = async ({ quizId, score }, token) => {
  const res = await fetch(`${BASE_URL}/api/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ quizId, score }),
  });
  if (!res.ok) throw new Error("فشل حفظ النتيجة");
};

export const fetchMyResults = async (token) => {
  const res = await fetch(`${BASE_URL}/api/result/my-results`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};
