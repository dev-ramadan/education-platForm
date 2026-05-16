import { useState, useEffect } from "react";
import { fetchAllUsers } from "../api/auth.api";
import { fetchCourses } from "../api/courses.api";
import { fetchAllEnrollments } from "../api/enrollment.api";
import { useAuth } from "./useAuth";

/**
 * useDashStats — جلب إحصائيات لوحة التحكم
 */
export default function useDashStats() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [users, courses, enrollments] = await Promise.all([
          fetchAllUsers(token),
          fetchCourses(),
          fetchAllEnrollments(token),
        ]);

        const students = users.filter((u) => u.role === "student").length;
        let pendingOrders = 0;
        let revenue = 0;

        enrollments.forEach((e) => {
          if (e.status === "pending") pendingOrders++;
          if (e.status === "active" && e.Course?.price) revenue += Number(e.Course.price);
        });

        setStats({ students, courses: courses.length, revenue, pendingOrders });
      } catch (err) {
        console.error("useDashStats:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  return { stats, loading };
}
