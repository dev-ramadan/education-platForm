import { addQuestion, getQuestions } from "../services/question.js";
import { resMsg } from "../utils/globaleMessage.js";

export const getAll = async (req, res) => {
    const question = await getQuestions(req);
    resMsg(res, 200, "تم جلب الاسئله بنجاح", question);
};

// export const getSingel = async (req, res) => {
//     const quiz = await getSingleQuiz(req);
//     resMsg(res, 200, "تم جلب الاحتبار بنجاح", quiz);
// };
export const add = async (req, res) => {
    const question = await addQuestion(req);
    resMsg(res, 200, "تم الاضافة بنجاح", question);
};