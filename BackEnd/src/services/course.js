import Course from "../db/models/Course.js";
import Lesson from "../db/models/Lesson.js";
import Quiz from "../db/models/Quiz.js";
import Question from "../db/models/Question.js";
import Option from "../db/models/Option.js";

// get all courses
export const getCourses = async () => {
    const courses = await Course.findAll();
    return courses;
};

// get single course
export const getSingleCourse = async (data) => {
    const { id } = data.params;

    const course = await Course.findOne({
        where: { id }
    });

    if (!course) {
        throw Error("غير موجود", { cause: 404 });
    }

    return course;
};

// add course
export const addCourse = async (data) => {
    const { role, id } = data.user;

    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح يجب الحصول علي صلاحيات المعلم", { cause: 403 });
    }

    const course = await Course.create({
        title: data.body.title,
        description: data.body.description,
        price: data.body.price,
        instructorId: id
    });

    return course;
};

// get course with lessons
export const getCourseWithLessons = async (data) => {
    const { id } = data.params;

    const course = await Course.findOne({
        where: { id },
        include: [
            {
                model: Lesson
            }, 
            { 
                model: Quiz,
                include: [{ 
                    model: Question,
                    include: [{ model: Option }]
                }]
            }
        ]
    });

    if (!course) {
        throw Error("الكورس غير موجود", { cause: 404 });
    }

    return course;
};

// delete course
export const deleteCourse = async (data) => {
    const { role, id } = data.user;
    const { courseId } = data.params;

    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح", { cause: 403 });
    }

    const course = await Course.findOne({ where: { id: courseId } });
    
    if (!course) {
        throw Error("الكورس غير موجود", { cause: 404 });
    }

    // Only admin or the instructor who created it
    if (role !== "admin" && course.instructorId !== id) {
        throw Error("غير مسموح بمسح هذا الكورس", { cause: 403 });
    }

    await course.destroy();
    return true;
};