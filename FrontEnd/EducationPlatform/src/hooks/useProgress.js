import { useState, useEffect } from "react";
import { updateProgress } from "../api/enrollment.api";
import { useAuth } from "./useAuth";

/**
 * useProgress — تتبع الدروس المكتملة وتحديثها
 */
export default function useProgress(enrollmentData, courseId) {
  const { token } = useAuth();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState({});

  // تحميل نسب إنجاز الدروس المخزنة محلياً عند تغيير الكورس
  useEffect(() => {
    if (courseId) {
      const stored = localStorage.getItem(`progress_${courseId}`);
      if (stored) {
        try {
          setLessonProgress(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing stored progress:", e);
        }
      } else {
        setLessonProgress({});
      }
    }
  }, [courseId]);

  useEffect(() => {
    if (enrollmentData?.completedLessons) {
      const data =
        typeof enrollmentData.completedLessons === "string"
          ? JSON.parse(enrollmentData.completedLessons)
          : enrollmentData.completedLessons;
      setCompletedLessons(Array.isArray(data) ? data : []);
    } else {
      setCompletedLessons([]);
    }
  }, [enrollmentData]);

  // تحديث نسبة إنجاز درس معين محلياً
  const updateLessonProgress = (lessonId, percent) => {
    if (!courseId) return;
    setLessonProgress((prev) => {
      const currentVal = prev[lessonId] || 0;
      const newVal = Math.round(percent);
      // نقوم بالتحديث فقط إذا كانت النسبة الجديدة أكبر من القديمة
      if (newVal > currentVal) {
        const updated = { ...prev, [lessonId]: Math.min(newVal, 100) };
        localStorage.setItem(`progress_${courseId}`, JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const markComplete = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    try {
      await updateProgress({ courseId, lessonId }, token);
      setCompletedLessons((prev) => [...prev, lessonId]);
      
      // بمجرد اكتمال الدرس، نجعل نسبته 100% تلقائياً
      updateLessonProgress(lessonId, 100);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  return { completedLessons, markComplete, lessonProgress, updateLessonProgress };
}
