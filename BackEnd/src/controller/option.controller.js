import { addOptions } from "../services/option.js";
import { resMsg } from "../utils/globaleMessage.js";

// export const getAll = async (req, res) => {
//     const quiz = await getQuiz(req);
//     resMsg(res, 200, "تم جلب الاحتبار بنجاح", quiz);
// };

// export const getSingel = async (req, res) => {
//     const quiz = await getSingleQuiz(req);
//     resMsg(res, 200, "تم جلب الاحتبار بنجاح", quiz);
// };
export const add = async (req, res) => {
    const option = await addOptions(req);
    resMsg(res, 200, "تم الاضافة بنجاح", option);
};