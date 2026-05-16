import { addLesson, getLessonById, getLessonsByCourse, updateLesson, deleteLesson } from "../services/lesson.js";
import { resMsg } from "../utils/globaleMessage.js";

export const getAll = async (req, res) => {
    const lesson = await getLessonsByCourse(req);
    resMsg(res, 200, "تم جلب الدروس بنجاح", lesson);
}


export const getSingel = async (req, res) => {
    const lesson = await getLessonById(req);
    resMsg(res, 200, "تم جلب الدرس بنجاح", lesson);
}
export const add = async (req, res) => {
    const lesson = await addLesson(req);
    resMsg(res, 200, "تم الاضافة بنجاح", lesson);
}

export const update = async (req, res) => {
    const lesson = await updateLesson(req);
    resMsg(res, 200, "تم التعديل بنجاح", lesson);

}

export const deleteLessonHandler = async (req, res) => {
    await deleteLesson(req);
    resMsg(res, 200, "تم الحذف بنجاح");

}