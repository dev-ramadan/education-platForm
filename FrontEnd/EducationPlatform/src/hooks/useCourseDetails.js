import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById, fetchInstructor } from "../api/courses.api";
import { fetchCourseEnrollment } from "../api/enrollment.api";
import { useAuth } from "./useAuth";

/**
 * useCourseDetails — جلب بيانات الكورس والمحاضر وحالة الاشتراك
 */
export default function useCourseDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState(null);

  const getCourseDetails = async () => {
    try {
      setLoading(true);
      const courseData = await fetchCourseById(id);
      setCourse(courseData);
      const instructorData = await fetchInstructor(courseData.instructorId);
      setInstructor(instructorData);
    } catch (err) {
      setError(err.message || "حدث خطأ في تحميل الكورس");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!token) return;
    try {
      const data = await fetchCourseEnrollment(course.id, token);
      if (data.length > 0) {
        setIsEnrolled(data[0].status);
        setEnrollmentData(data[0]);
      } else {
        setIsEnrolled(false);
      }
    } catch (err) {
      console.error("checkEnrollment:", err);
    }
  };

  useEffect(() => {
    if (id) getCourseDetails();
  }, [id]);

  useEffect(() => {
    if (course?.id) checkEnrollment();
  }, [course]);

  return { course, instructor, loading, error, isEnrolled, enrollmentData };
}
