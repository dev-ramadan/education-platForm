import { BASE_URL } from "./config";


export const fetchCourses = async () => {
  const res = await fetch(`${BASE_URL}/api/course`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data;
};

export const fetchCourseById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/course/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data;
};

export const createCourse = async (form, token) => {
  const res = await fetch(`${BASE_URL}/api/course`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteCourse = async (courseId, token) => {
  const res = await fetch(`${BASE_URL}/api/course/${courseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "فشل الحذف");
  }
};

export const fetchLessons = async (courseId) => {
  const res = await fetch(`${BASE_URL}/api/lessons/${courseId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};

export const deleteLesson = async (lessonId, token) => {
  const res = await fetch(`${BASE_URL}/api/lesson/${lessonId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("فشل الحذف");
};

export const fetchInstructor = async (instructorId) => {
  const res = await fetch(`${BASE_URL}/auth/instructor/${instructorId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data;
};
