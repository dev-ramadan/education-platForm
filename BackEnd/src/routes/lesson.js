import {Router} from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { add, deleteLessonHandler, getAll, getSingel, update } from "../controller/lesson.controller.js";

export const lessonRouter = Router();

lessonRouter.get("/lessons/:courseId",asyncHandler(getAll));
lessonRouter.get("/lesson/:id",asyncHandler(getSingel));
lessonRouter.post("/lesson",auth,asyncHandler(add))
lessonRouter.put("/lesson",auth,asyncHandler(update))
lessonRouter.delete("/lesson/:id",auth,asyncHandler(deleteLessonHandler))