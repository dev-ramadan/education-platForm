import Result from "../db/models/Result.js";
import Quiz from "../db/models/Quiz.js";
import Course from "../db/models/Course.js";
import User from "../db/models/User.js";

// Add Result
export const addResult = async (data) => {
    const { id } = data.user;
    const { quizId, score } = data.body;

    // Check if result already exists for this user and quiz
    let result = await Result.findOne({
        where: { userId: id, quizId }
    });

    if (result) {
        // Update score if they retake it
        result.score = score;
        await result.save();
    } else {
        result = await Result.create({
            userId: id,
            quizId,
            score
        });
    }

    return result;
};

// Get My Results
export const getMyResults = async (data) => {
    const { id } = data.user;

    const results = await Result.findAll({
        where: { userId: id },
        include: [{ 
            model: Quiz, 
            attributes: ["title", "duration"],
            include: [{ model: Course, attributes: ["title"] }]
        }]
    });

    return results;
};

// Get All Results (for admin/instructor)
export const getAllResults = async (data) => {
    const { role } = data.user;

    if (role !== "admin" && role !== "instructor") {
        throw Error("غير مسموح", { cause: 403 });
    }

    const results = await Result.findAll({
        include: [
            { 
                model: User, 
                attributes: ["name", "email"] 
            },
            { 
                model: Quiz, 
                attributes: ["title", "duration"],
                include: [{ model: Course, attributes: ["title", "id"] }]
            }
        ],
        order: [["createdAt", "DESC"]]
    });

    return results;
};

