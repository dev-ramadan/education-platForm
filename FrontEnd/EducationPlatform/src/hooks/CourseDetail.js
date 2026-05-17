import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useCourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState(null);

  // GET COURSE
  const getCourseDetails = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/course/${id}`);
      const data = await res.json();

      const courseData = data.data;
      setCourse(courseData);

      // GET INSTRUCTOR
      const instructorRes = await fetch(
        `${BASE_URL}/auth/instructor/${courseData.instructorId}`
      );

      const instructorData = await instructorRes.json();
      setInstructor(instructorData.data);

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const checkEnrollment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/enrollment/my-courses/${course.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resulat = await res.json();
      
      if (resulat.data && resulat.data.length > 0) {
        setIsEnrolled(resulat.data[0].status);
        setEnrollmentData(resulat.data[0]);
      } else {
        setIsEnrolled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (course?.id) {
      checkEnrollment();
    }
  }, [course]);

  useEffect(() => {
    if (id) getCourseDetails();
  }, [id]);

  return {
    course,
    instructor,
    isEnrolled,
    enrollmentData,
    loading,
  };
}