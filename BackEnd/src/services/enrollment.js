import Course from "../db/models/Course.js";
import Enrollment from "../db/models/Enrollment.js";
import User from "../db/models/User.js";
import { formatPhone, sendWhatsApp, toWhatsApp } from "../utils/whatsapp.js";


// 🧑‍🎓 1. الطالب يطلب Enrollment
export const requestEnrollment = async (data) => {
    const { id } = data.user;
    const { courseId, phone } = data.body;

    const cleanPhone = formatPhone(phone);

    // التأكد من وجود الكورس
    const course = await Course.findByPk(courseId);
    if (!course) throw Error("المادة غير موجودة");

    // منع التكرار
    const exist = await Enrollment.findOne({
        where: { userId: id, courseId }
    });

    if (exist) throw Error("تم إرسال طلب مسبقًا");

    // إنشاء الطلب
    const enrollment = await Enrollment.create({
        userId: id,
        courseId,
        phone: cleanPhone,
        status: "pending"
    });

    // 📩 رسالة للطالب
    await sendWhatsApp(
        toWhatsApp(`+20${cleanPhone}`),
        `📩 تم استلام طلب الاشتراك في ${course.title}\nوجاري المراجعة`
    );

    // 🚀 رسالة للأدمن
    await sendWhatsApp(
        process.env.ADMIN_PHONE,
        `🚀 طلب اشتراك جديد\n📚 ${course.title}\n📱 +20${cleanPhone}`
    );

    return enrollment;
};


// 🧑‍💼 2. الأدمن يشوف الطلبات
export const getPendingEnrollments = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    return await Enrollment.findAll({
        include: [
            { model: User, attributes: { exclude: ["id", "password", "role"] } },
            { model: Course, attributes: ["title", "price"] }
        ]
    });
};


// ✅ 3. قبول الطلب
export const approveEnrollment = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    const { enrollmentId } = data.params;

    const enrollment = await Enrollment.findByPk(enrollmentId, {
        include: [Course]
    });

    if (!enrollment) throw Error("غير موجود");

    enrollment.status = "active";
    await enrollment.save();

    // 🎉 رسالة للطالب
    await sendWhatsApp(
        toWhatsApp(`+20${enrollment.phone}`),
        `🎉 تم قبول طلبك في كورس ${enrollment.Course.title}`
        
    );
    console.log(enrollment.phone);

    return enrollment;
};


// ❌ 4. رفض الطلب
export const rejectEnrollment = async (data) => {
    const { role } = data.user;

    if (role !== "admin") {
        throw Error("غير مسموح");
    }

    const { enrollmentId } = data.params;

    const enrollment = await Enrollment.findByPk(enrollmentId, {
        include: [Course]
    });

    if (!enrollment) throw Error("غير موجود");

    enrollment.status = "rejected";
    await enrollment.save();

    // ❌ رسالة للطالب
    await sendWhatsApp(
        toWhatsApp(`+20${enrollment.phone}`),
        `❌ تم رفض طلبك في كورس ${enrollment.Course.title}`
    );

    return enrollment;
};


// 🎓 5. جلب كورسات الطالب
export const getMyCourses = async (data) => {
    const { id } = data.user;
    const { courseId } = data.params;

    return await Enrollment.findAll({
        where: {
            userId: id,
            courseId,
            status: "active"
        },
        include: [Course]
    });
};


// 📊 6. حالة كورسات الطالب
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


// 📈 7. تحديث التقدم
export const updateProgress = async (data) => {
    const { id } = data.user;
    const { courseId, lessonId } = data.body;

    const enrollment = await Enrollment.findOne({
        where: {
            userId: id,
            courseId,
            status: "active"
        }
    });

    if (!enrollment) throw Error("غير مسجل في هذا الكورس");

    let completed = enrollment.completedLessons || [];
    if (!Array.isArray(completed)) completed = [];

    if (!completed.includes(lessonId)) {
        enrollment.completedLessons = [...completed, lessonId];
        await enrollment.save();
    }

    return enrollment;
};