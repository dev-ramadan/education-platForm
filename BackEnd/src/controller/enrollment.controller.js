import { approveEnrollment, getMyCourses, getPendingEnrollments, rejectEnrollment, requestEnrollment, updateProgress, getStudentCoursesStatus } from "../services/enrollment.js";
import { resMsg } from "../utils/globaleMessage.js";

// 🧑‍🎓 طلب اشتراك
export const request = async (req, res) => {
    const enrollment = await requestEnrollment(req);

    resMsg(res, 201, "تم إرسال طلب الاشتراك", enrollment);
};
// 🧑‍💼 عرض الطلبات (Admin)
export const getPending = async (req, res) => {
    const data = await getPendingEnrollments(req);

    resMsg(res, 200, "تم جلب الطلبات", data);
};
// ✅ قبول الطلب
export const approve = async (req, res) => {
    const data = await approveEnrollment(req);

    resMsg(res, 200, "تم قبول الاشتراك", data);
};
// ❌ رفض الطلب
export const reject = async (req, res) => {
    const data = await rejectEnrollment(req);

    resMsg(res, 200, "تم رفض الاشتراك", data);
};
// 🎓 كورسات الطالب
export const myCourses = async (req, res) => {
    const data = await getMyCourses(req);

    resMsg(res, 200, "تم جلب كورساتك", data);
};

export const myStatus = async (req, res) => {
    const data = await getStudentCoursesStatus(req);
    resMsg(res, 200, "تم جلب حالة الكورسات", data);
};

export const progress = async (req, res) => {
    const data = await updateProgress(req);
    resMsg(res, 200, "تم تحديث التقدم", data);
};