import { addCourse, getCourses, getCourseWithLessons, getSingleCourse, deleteCourse } from "../services/course.js"
import { getStudentCoursesStatus } from "../services/enrollment.js";
import { resMsg } from "../utils/globaleMessage.js";

export const getAll = async (req,res) => {
    const courses = await getCourses();
    resMsg(res,200,"تم جلب الكورسات بنجاح",courses);
}

export const getSingel = async (req,res) => {
    const course = await getSingleCourse(req);
    resMsg(res,200,"تم جلب الكورس بنجاح",course);
}
export const add = async (req,res) => {
    const course = await addCourse(req);
    resMsg(res,200,"تم الاضافة بنجاح",course);
}

export const courseWithLessons = async (req,res) => {
    const course = await getCourseWithLessons(req);
    resMsg(res,200,"تم جلب بياناتىالكورس بنجاح",course)
}


export const myCoursesStatus = async (req, res) => {
    const data = await getStudentCoursesStatus(req);

    resMsg(res, 200, "تم جلب حالة الكورسات", data);
};

export const deleteCourseHandler = async (req, res) => {
    await deleteCourse(req);
    resMsg(res, 200, "تم مسح الكورس بنجاح");
};