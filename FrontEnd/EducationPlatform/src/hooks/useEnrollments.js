import { useState, useEffect } from "react";
import { fetchAllEnrollments, approveEnrollment, rejectEnrollment } from "../api/enrollment.api";
import { useAuth } from "./useAuth";

/**
 * useEnrollments — إدارة طلبات الاشتراك (للأدمن)
 */
export default function useEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEnrollments(token);
      setEnrollments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await approveEnrollment(id, token);
      setEnrollments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "active" } : item))
      );
    } catch {
      alert("حدث خطأ أثناء قبول الطلب");
    }
  };

  const reject = async (id) => {
    if (!confirm("هل أنت متأكد من رفض هذا الطلب؟")) return;
    try {
      await rejectEnrollment(id, token);
      setEnrollments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item))
      );
    } catch {
      alert("حدث خطأ أثناء رفض الطلب");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { enrollments, loading, error, approve, reject };
}
