import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyEnrollments } from "../api/enrollment.api";
import { fetchMyResults } from "../api/quiz.api";
import { useAuth } from "./useAuth";

/**
 * useStudentProfile — جلب بيانات الطالب وكورساته ونتائجه
 */
export default function useStudentProfile() {
  const [enrollments, setEnrollments] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const [enrollData, resultsData] = await Promise.all([
          fetchMyEnrollments(token),
          fetchMyResults(token),
        ]);
        setEnrollments(enrollData);
        setResults(resultsData);
      } catch (err) {
        console.error("useStudentProfile:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, navigate]);

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const otherEnrollments = enrollments.filter((e) => e.status !== "active");

  return { user, enrollments, results, loading, activeEnrollments, otherEnrollments };
}
