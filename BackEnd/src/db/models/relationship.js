import User  from"./User.js";
import Result  from"./Result.js";
import Payment  from"./Payment.js";
import Course  from"./Course.js";
import Lesson  from"./Lesson.js";
import Question  from"./Question.js";
import Quiz  from"./Quiz.js";
import Option  from"./Option.js";
import Enrollment from "./Enrollment.js";


// 👤 1. User ↔ Result
User.hasMany(Result, {
  foreignKey: "userId",
});

Result.belongsTo(User, {
  foreignKey: "userId",
});

// 👤 2. User ↔ Payment
User.hasMany(Payment, {
  foreignKey: "userId",
});

Payment.belongsTo(User, {
  foreignKey: "userId",
});

// 👤 3. User ↔ Enrollment
User.hasMany(Enrollment, {
  foreignKey: "userId",
});

Enrollment.belongsTo(User, {
  foreignKey: "userId",
});

// 📚 4. Course ↔ Lesson
Course.hasMany(Lesson, {
  foreignKey: "courseId",
});

Lesson.belongsTo(Course, {
  foreignKey: "courseId",
});

Course.hasMany(Enrollment, {
  foreignKey: "courseId",
});

Enrollment.belongsTo(Course, {
  foreignKey: "courseId",
});

// 📚 5. Course ↔ Quiz
Course.hasMany(Quiz, {
  foreignKey: "courseId",
});

Quiz.belongsTo(Course, {
  foreignKey: "courseId",
});

// 📝 6. Quiz ↔ Question
Quiz.hasMany(Question, {
  foreignKey: "quizId",
});

Question.belongsTo(Quiz, {
  foreignKey: "quizId",
});

// 🔘 7. Question ↔ Option
Question.hasMany(Option, {
  foreignKey: "questionId",
});

Option.belongsTo(Question, {
  foreignKey: "questionId",
});

//  📊 8. Quiz ↔ Result
Quiz.hasMany(Result, {
  foreignKey: "quizId",
});

Result.belongsTo(Quiz, {
  foreignKey: "quizId",
});

// 💳 9. Payment ↔ Enrollment
Payment.hasOne(Enrollment, {
  foreignKey: "paymentId",
});

Enrollment.belongsTo(Payment, {
  foreignKey: "paymentId",
});