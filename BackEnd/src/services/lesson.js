import Lesson from "../db/models/Lesson.js";

export const addLesson = async (data) => {
    const { title, video_url, courseId } = data.body;
    const lesson = await Lesson.create({
        title,
        video_url,
        courseId,
    });
    return lesson
};


export const getLessonsByCourse = async (data) => {
    const { courseId } = data.params;
    const lessons = await Lesson.findAll({
        where: { courseId },
        order: [["id", "ASC"]],
    });
    return lessons

};

export const getLessonById = async (data) => {

    const { id } = data.params;

    const lesson = await Lesson.findByPk(id);
    if (!lesson)
        throw Error("الدرس غير موجود", { cause: 404 })
    return lesson
}

export const updateLesson = async (data) => {
        const { id } = data.params;

        const lesson = await Lesson.findByPk(id);

        if (!lesson) throw Error("الدرس غير موجود", { cause: 404 })

        await lesson.update(req.body);

        return lesson

    
};


export const deleteLesson = async (data) => {
    const { role } = data.user;
    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح", { cause: 403 });
    }

    const { id } = data.params;
    const lesson = await Lesson.findByPk(id);

    if (!lesson) throw Error("الدرس غير موجود", { cause: 404 });

    await lesson.destroy();
    return true;
};