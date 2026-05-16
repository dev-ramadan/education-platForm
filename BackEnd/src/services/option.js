import Option from "../db/models/Option.js";


// add Option
export const addOptions = async (data) => {
    const { role } = data.user;

    if (role !== "instructor" && role !== "admin") {
        throw Error("غير مسموح", { cause: 403 });
    }

    const { questionId, options } = data.body;

    const newOptions = options.map(item => ({
        option: item.option,
        correct_answer: item.correct_answer,
        questionId
    }));

    const result = await Option.bulkCreate(newOptions);

    return result;
};

