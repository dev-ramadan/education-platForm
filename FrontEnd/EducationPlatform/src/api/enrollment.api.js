import { BASE_URL } from "./config";


export const fetchAllEnrollments = async (token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "حصل خطأ");
  return data.data || [];
};

export const fetchMyEnrollments = async (token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};

export const fetchCourseEnrollment = async (courseId, token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/my-courses/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};

export const createEnrollment = async ({ phone, courseId }, token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ phone, courseId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const approveEnrollment = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/approve/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("فشل القبول");
};

export const rejectEnrollment = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/reject/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("فشل الرفض");
};

export const updateProgress = async ({ courseId, lessonId }, token) => {
  const res = await fetch(`${BASE_URL}/api/enrollment/progress`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ courseId, lessonId }),
  });
  if (!res.ok) throw new Error("فشل تحديث التقدم");
};
