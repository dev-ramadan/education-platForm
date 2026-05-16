import { Router } from "express";
import { add, getAll, getSingel } from "../controller/quiz.controller.js";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const quizRouter = Router();

quizRouter.get("/quiz/course/:courseId",asyncHandler(getAll));
quizRouter.get("/quiz/:id",asyncHandler(getSingel));
quizRouter.post("/quiz",auth,asyncHandler(add))
quizRouter.put("/quiz",auth,asyncHandler())
quizRouter.delete("/quiz",auth,asyncHandler())
























