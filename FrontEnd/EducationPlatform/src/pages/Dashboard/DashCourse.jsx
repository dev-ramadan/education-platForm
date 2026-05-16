import { useState } from "react";
import useCourses from "../../hooks/useCourses";
import { fetchLessons, deleteCourse, deleteLesson } from "../../api/courses.api";
import { useAuth } from "../../hooks/useAuth";
import AddLesson from "../../components/admin/AddLesson";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Modal from "../../components/common/Modal";

export default function DashCourse() {
  const { courses, loading, addCourse } = useCourses();
  const { token } = useAuth();

  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [courseLessons, setCourseLessons] = useState([]);
  const [viewingCourseId, setViewingCourseId] = useState(null);
  const [addingLessonCourseId, setAddingLessonCourseId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price) return alert("يرجى تعبئة الحقول");
    const result = await addCourse(form);
    if (result.success) {
      alert("تمت إضافة الكورس بنجاح 🚀");
      setForm({ title: "", description: "", price: "" });
    } else {
      alert(result.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الكورس وجميع دروسه؟")) return;
    try {
      await deleteCourse(courseId, token);
      alert("تم حذف الكورس بنجاح");
      window.location.reload();
    } catch (err) {
      alert(err.message || "فشل الحذف");
    }
  };

  const handleViewLessons = async (courseId) => {
    try {
      const data = await fetchLessons(courseId);
      setCourseLessons(data);
      setViewingCourseId(courseId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الدرس؟")) return;
    try {
      await deleteLesson(lessonId, token);
      alert("تم حذف الدرس بنجاح");
      setCourseLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch (err) {
      alert(err.message || "فشل الحذف");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8">إدارة الكورسات والدروس</h1>

        {/* Add Course + Tips */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 shadow-lg rounded-2xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center gap-2">
              <span className="text-2xl">📚</span> إضافة كورس جديد
            </h2>
            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border border-slate-200 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="عنوان الكورس"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border border-slate-200 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="وصف الكورس"
                rows="3"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="border border-slate-200 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="سعر الكورس (ج.م)"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                إضافة الكورس
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg rounded-2xl text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">تعليمات الإدارة</h3>
            <ul className="space-y-3 opacity-90">
              <li>1. قم بإضافة الكورس أولاً من النموذج.</li>
              <li>2. يمكنك إدارة الدروس بالضغط على "عرض الدروس" تحت كل كورس.</li>
              <li>3. حذف الكورس سيؤدي لحذف جميع الدروس والامتحانات المرتبطة به.</li>
            </ul>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white p-6 shadow-lg rounded-2xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">الكورسات المتاحة</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-slate-200 p-5 rounded-xl hover:shadow-lg transition-shadow bg-slate-50/50 flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">{course.price} ج.م</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAddingLessonCourseId(course.id)}
                        className="flex-1 bg-indigo-100 text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-200 transition-colors text-xs"
                      >
                        + درس
                      </button>
                      <button
                        onClick={() => handleViewLessons(course.id)}
                        className="flex-1 bg-blue-100 text-blue-700 font-bold py-2 rounded-lg hover:bg-blue-200 transition-colors text-xs"
                      >
                        عرض الدروس
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="w-full bg-red-50 text-red-600 font-bold py-2 rounded-lg hover:bg-red-100 transition-colors text-xs"
                    >
                      🗑️ حذف الكورس
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lessons Modal */}
        <Modal
          isOpen={!!viewingCourseId}
          onClose={() => setViewingCourseId(null)}
          maxWidth="max-w-2xl"
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">دروس الكورس</h2>
            <div className="space-y-3">
              {courseLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <span className="font-bold text-slate-700">{lesson.title}</span>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    حذف
                  </button>
                </div>
              ))}
              {courseLessons.length === 0 && (
                <p className="text-center text-slate-500 py-4">لا توجد دروس لهذا الكورس</p>
              )}
            </div>
          </div>
        </Modal>

        {/* Add Lesson Modal */}
        {addingLessonCourseId && (
          <AddLesson
            courseId={addingLessonCourseId}
            setIsAddingLesson={() => setAddingLessonCourseId(null)}
          />
        )}
      </div>
    </div>
  );
}