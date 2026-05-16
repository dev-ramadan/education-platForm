import { useEffect, useState } from "react";

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET COURSES
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/course");
      const data = await res.json();

      setCourses(data.data);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ADD COURSE
  const addCourse = async (form) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // refresh list
      fetchCourses();

      return { success: true, data };

    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    fetchCourses,
    addCourse,
  };
}