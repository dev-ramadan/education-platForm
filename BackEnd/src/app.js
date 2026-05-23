import * as connect from "./db/connection.js";
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

const bootstrap = (app, express) => {
  connect.connectionDB()
    .then(() => connect.syncModels())
    .catch((error) => console.error("Database connection/sync error:", error));

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
};

export default bootstrap;