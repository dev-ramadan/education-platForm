import Course from "../db/models/Course.js";
import Enrollment from "../db/models/Enrollment.js";
import User from "../db/models/User.js";

// 🧑‍🎓 1. الطالب يطلب Enrollment
export const requestEnrollment = async (data) => {
    const { id } = data.user;
    const { courseId,phone } = data.body;

    // تأكد إن الكورس موجود
    const course = await Course.findByPk(courseId);
    if (!course) {
        throw Error("المادة غير موجودة");
    }

    // منع التكرار
    const exist = await Enrollment.findOne({
        where: { userId: id, courseId }
    });

    if (exist) {
        throw Error("تم إرسال طلب مسبقًا");
    }

    const enrollment = await Enrollment.create({
        userId: id,
        courseId,
        phone,
        status: "pending"
    });

    return enrollment;
};
// 🧑‍💼 2. المدير يشوف الطلبات
export const getPendingEnrollments = async (data) => {
    const { role } = data.user;
    if (role !== "admin"  ) {
        throw Error("غير مسموح");
    }
    const requests = await Enrollment.findAll({
        include: [
            { model: User,attributes:{exclude:["id","password","role"]} },
            { model: Course , attributes: ["title", "price"],}
            
        ]
    });

    return requests;
};
// ✅ 3. قبول الطلب
export const approveEnrollment = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    const { enrollmentId } = data.params;

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
        throw Error("غير موجود");
    }

    enrollment.status = "active";
    await enrollment.save();

    return enrollment;
};
// ❌ 4. رفض الطلب
export const rejectEnrollment = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    const { enrollmentId } = data.params;

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
        throw Error("غير موجود");
    }

    enrollment.status = "rejected";
    await enrollment.save();

    return enrollment;
};
// 🎓 5. جلب كورسات الطالب
export const getMyCourses = async (data) => {
    const { id } = data.user;
    
      const { courseId } = data.params;

    const enrollments = await Enrollment.findAll({
        where: {
            userId: id,
            courseId,
            status: "active"
        },
        include: [Course]
    });

    return enrollments;
};

export const getStudentCoursesStatus = async (data) => {
    const { id } = data.user;

    const enrollments = await Enrollment.findAll({
        where: { userId: id },
        include: [{ model: Course }]
    });

    return enrollments.map(enroll => ({
        courseId: enroll.courseId,
        courseTitle: enroll.Course?.title,
        status: enroll.status
    }));
};

export const updateProgress = async (data) => {
    const { id } = data.user;
    const { courseId, lessonId } = data.body;

    const enrollment = await Enrollment.findOne({
        where: { userId: id, courseId, status: "active" }
    });

    if (!enrollment) throw Error("غير مسجل في هذا الكورس");

    let completed = enrollment.completedLessons || [];
    if (!Array.isArray(completed)) completed = []; 

    if (!completed.includes(lessonId)) {
        // Create a new array reference to ensure Sequelize detects the change
        const newCompleted = [...completed, lessonId];
        enrollment.completedLessons = newCompleted;
        await enrollment.save();
    }

    return enrollment;
};