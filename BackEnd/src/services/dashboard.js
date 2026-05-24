import User from "../db/models/User.js";
import Course from "../db/models/Course.js";
import Enrollment from "../db/models/Enrollment.js";
import Quiz from "../db/models/Quiz.js";
import Result from "../db/models/Result.js";
import { sequelize } from "../db/connection.js";

export const getDashboardStats = async (data) => {
    const { role } = data.user;
    if (role !== "admin" && role !== "instructor") {
        throw Error("غير مسموح للحصول على الإحصائيات", { cause: 403 });
    }

    // 1. Counts
    const totalStudents = await User.count({ where: { role: "student" } });
    const totalCourses = await Course.count();
    const totalEnrollments = await Enrollment.count();
    const totalQuizzes = await Quiz.count();

    // 2. Most subscribed courses (Top 10)
    const rawCourseStats = await Enrollment.findAll({
        attributes: [
            "courseId",
            [sequelize.fn("COUNT", sequelize.col("Enrollment.id")), "subscriptionCount"]
        ],
        include: [{
            model: Course,
            attributes: ["title"]
        }],
        group: ["Enrollment.courseId", "Course.id", "Course.title"],
        order: [[sequelize.fn("COUNT", sequelize.col("Enrollment.id")), "DESC"]],
        limit: 10
    });

    const courseStats = rawCourseStats.map(item => ({
        courseId: item.courseId,
        title: item.Course ? item.Course.title : `كورس #${item.courseId}`,
        subscriptions: parseInt(item.getDataValue("subscriptionCount") || 0)
    }));

    // 3. Top results (highest scores)
    const rawTopResults = await Result.findAll({
        include: [
            { model: User, attributes: ["name", "email"] },
            { 
                model: Quiz, 
                attributes: ["title"],
                include: [{ model: Course, attributes: ["title"] }]
            }
        ],
        order: [["score", "DESC"]],
        limit: 10
    });

    const topResults = rawTopResults.map(item => ({
        studentName: item.User ? item.User.name : "طالب غير معروف",
        email: item.User ? item.User.email : "",
        quizTitle: item.Quiz ? item.Quiz.title : "امتحان غير معروف",
        courseTitle: (item.Quiz && item.Quiz.Course) ? item.Quiz.Course.title : "مادة غير معروفة",
        score: item.score
    }));

    // 4. Enrollments status counts
    const rawEnrollmentStatus = await Enrollment.findAll({
        attributes: [
            "status",
            [sequelize.fn("COUNT", sequelize.col("id")), "count"]
        ],
        group: ["status"]
    });

    const enrollmentStatus = rawEnrollmentStatus.map(item => ({
        status: item.status,
        count: parseInt(item.getDataValue("count") || 0)
    }));

    return {
        counts: {
            students: totalStudents,
            courses: totalCourses,
            enrollments: totalEnrollments,
            quizzes: totalQuizzes
        },
        courseStats,
        topResults,
        enrollmentStatus
    };
};
