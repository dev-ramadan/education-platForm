import * as connect from "./db/connection.js";

// ✅ مهم جدًا: نحمل الموديلات الأول
import "./db/models/index.js";

// ✅ بعد كده العلاقات
import "./db/models/relationship.js";

import { courseRouter } from "./routes/course.js";
import { enrollmentRouter } from "./routes/enrollment.js";
import { lessonRouter } from "./routes/lesson.js";
import { optionRouter } from "./routes/option.js";
import { questionRouter } from "./routes/question.js";
import { quizRouter } from "./routes/quiz.js";
import { userRouter } from "./routes/user.js";
import { resultRouter } from "./routes/result.js";

import { errorHandel } from "./utils/errorHandeler.js";

const bootstrap = async (app, express) => {
  try {
    // ✅ الاتصال بالداتا بيز
    await connect.connectionDB();

    // ✅ sync بعد ما العلاقات تتحمل
    await connect.syncModels();

    // ✅ Routes
    app.use("/auth", userRouter);
    app.use("/api", courseRouter);
    app.use("/api", lessonRouter);
    app.use("/api", quizRouter);
    app.use("/api", questionRouter);
    app.use("/api", optionRouter);
    app.use("/api", enrollmentRouter);
    app.use("/api", resultRouter);

    // ✅ Error handler
    app.use(errorHandel);

  } catch (error) {
    console.error("Error in bootstrap:", error);
  }
};

export default bootstrap;