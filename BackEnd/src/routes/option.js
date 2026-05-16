import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { add } from "../controller/option.controller.js";

export const optionRouter = Router();

// quizRouter.get("/quiz/course/:courseId",asyncHandler(getAll));
// quizRouter.get("/quiz/:id",asyncHandler(getSingel));
optionRouter.post("/option",auth,asyncHandler(add))
// quizRouter.put("/quiz",auth,asyncHandler())
// quizRouter.delete("/quiz",auth,asyncHandler())
























