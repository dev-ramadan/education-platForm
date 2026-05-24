import Question from "../db/models/Question.js";
import Quiz from "../db/models/Quiz.js";


// get all qizes
export const getQuiz = async (data) => {
    const { courseId } = data.params;
    const quiz = await Quiz.findAll({ where: { courseId } });
    return quiz;
};

// get single quize
export const getSingleQuiz = async (data) => {
    const { id } = data.params;
    const quiz = await Quiz.findOne({
        where: { id },
        include: [{ model: Question }]
    });

    if (!quiz) {
        throw Error("غير موجود", { cause: 404 });
    }

    return quiz;
};

// add quiz
export const addQuiz = async (data) => {
    const { role, id } = data.user;

    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح يجب الحصول علي صلاحيات المعلم", { cause: 403 });
    }

    const quiz = await Quiz.create({
        title: data.body.title,
        description: data.body.description || "",
        courseId: data.body.courseId,
        duration: data.body.time,
        instructorId: id
    });

    return quiz;
};

