import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { add, getAll } from "../controller/question.controller.js";

export const questionRouter = Router();

questionRouter.get("/question/quiz/:quizId",asyncHandler(getAll));
questionRouter.post("/question",auth,asyncHandler(add))
// questionRouter.get("/quiz/:id",asyncHandler(getSingel));
// questionRouter.put("/quiz",auth,asyncHandler())
// questionRouter.delete("/quiz",auth,asyncHandler())
























