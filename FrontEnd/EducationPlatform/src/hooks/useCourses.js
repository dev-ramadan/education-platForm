import { useState, useEffect } from "react";
import { fetchCourses, createCourse } from "../api/courses.api";
import { useAuth } from "./useAuth";

/**
 * useCourses — جلب قائمة الكورسات وإضافة كورس جديد
 */
export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      console.error("useCourses:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (form) => {
    try {
      const data = await createCourse(form, token);
      await loadCourses();
      return { success: true, data };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return { courses, loading, fetchCourses: loadCourses, addCourse };
}
