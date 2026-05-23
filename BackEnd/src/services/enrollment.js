import Course from "../db/models/Course.js";
import Enrollment from "../db/models/Enrollment.js";
import User from "../db/models/User.js";
import { sendNotification } from "../services/notification.js";


// 🧑‍🎓 1. الطالب يطلب Enrollment
export const requestEnrollment = async (data) => {
    const { id } = data.user;
    const { courseId, phone } = data.body;

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

    // إنشاء الطلب
    const enrollment = await Enrollment.create({
        userId: id,
        courseId,
        phone,
        status: "pending"
    });

    // 🔔 إرسال إشعار للأدمن
    const admins = await User.findAll({ where: { role: "admin" } });

    const courseData = await Course.findByPk(courseId);

    admins.forEach(async (admin) => {
        await sendNotification(
            admin.fcm_token,
            "طلب تسجيل جديد 📩",
            `طالب طلب الانضمام لكورس: ${courseData?.title}`,
            {
                type: "NEW_ENROLLMENT",
                enrollmentId: enrollment.id.toString()
            }
        );
    });

    return enrollment;
};


// 🧑‍💼 2. المدير يشوف الطلبات
export const getPendingEnrollments = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    const requests = await Enrollment.findAll({
        include: [
            { model: User, attributes: { exclude: ["id", "password", "role"] } },
            { model: Course, attributes: ["title", "price"] }
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

    // 🔔 إشعار للطالب
    const student = await User.findByPk(enrollment.userId);

    await sendNotification(
        student?.fcm_token,
        "تم قبولك 🎉",
        "تم قبول طلبك في الكورس بنجاح",
        {
            type: "ENROLLMENT_APPROVED",
            courseId: enrollment.courseId.toString()
        }
    );

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

    // 🔔 إشعار للطالب
    const student = await User.findByPk(enrollment.userId);

    await sendNotification(
        student?.fcm_token,
        "تم رفض الطلب ❌",
        "تم رفض طلبك للانضمام للكورس",
        {
            type: "ENROLLMENT_REJECTED",
            courseId: enrollment.courseId.toString()
        }
    );

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


// 📊 6. حالة الكورسات للطالب
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


// 📚 7. تحديث progress
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
        const newCompleted = [...completed, lessonId];
        enrollment.completedLessons = newCompleted;
        await enrollment.save();
    }

    return enrollment;
};