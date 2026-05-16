import { useState, useEffect } from "react";
import { updateProgress } from "../api/enrollment.api";
import { useAuth } from "./useAuth";

/**
 * useProgress — تتبع الدروس المكتملة وتحديثها
 */
export default function useProgress(enrollmentData, courseId) {
  const { token } = useAuth();
  const [completedLessons, setCompletedLessons] = useState([]);

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

  const markComplete = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    try {
      await updateProgress({ courseId, lessonId }, token);
      setCompletedLessons((prev) => [...prev, lessonId]);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  return { completedLessons, markComplete };
}
