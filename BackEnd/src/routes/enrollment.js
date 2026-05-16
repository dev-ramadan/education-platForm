import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { approve, getPending, myCourses, reject, request, progress, myStatus } from "../controller/enrollment.controller.js";
import { auth } from "../middleware/auth.js";

export const enrollmentRouter = Router();
// 🧑‍🎓 الطالب يطلب اشتراك
enrollmentRouter.post(
    "/enrollment",
    auth,
    asyncHandler(request)
);
// 🧑‍💼 المدير يشوف الطلبات
enrollmentRouter.get(
    "/enrollment/pending",
    auth,
    asyncHandler(getPending)
);
// ✅ قبول الطلب
enrollmentRouter.put(
    "/enrollment/approve/:enrollmentId",
    auth,
    asyncHandler(approve)
);
// ❌ رفض الطلب
enrollmentRouter.put(
    "/enrollment/reject/:enrollmentId",
    auth,
    asyncHandler(reject)
);
// 🎓 كورسات الطالب
enrollmentRouter.get(
    "/enrollment/my-courses/:courseId",
    auth,
    asyncHandler(myCourses)
);
// 📊 حالة كورسات الطالب
enrollmentRouter.get(
    "/enrollment/status",
    auth,
    asyncHandler(myStatus)
);
// 📈 تحديث التقدم
enrollmentRouter.put(
    "/enrollment/progress",
    auth,
    asyncHandler(progress)
);