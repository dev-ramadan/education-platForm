import Option from "../db/models/Option.js";
import Question from "../db/models/Question.js";


// get all question
export const getQuestions = async (data) => {
    const { quizId } = data.params;
    const question = await Question.findAll({ where: { quizId }, include: [{ model: Option, attributes: ["id", "option"] }] });
    return question;
};


// add question
export const addQuestion = async (data) => {
    const { role, id } = data.user;

    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح يجب الحصول علي صلاحيات المعلم أو الإدارة", { cause: 403 });
    }

    const question = await Question.create({
        question: data.body.question,
        quizId: data.body.quizId,
        instructorId: id
    });

    return question;
};

