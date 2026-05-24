import { getDashboardStats } from "../services/dashboard.js";
import { resMsg } from "../utils/globaleMessage.js";

export const getStats = async (req, res) => {
    const stats = await getDashboardStats(req);
    resMsg(res, 200, "تم جلب إحصائيات لوحة التحكم بنجاح", stats);
};
