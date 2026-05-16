import {Router} from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { add, courseWithLessons, getAll, getSingel, myCoursesStatus, deleteCourseHandler } from "../controller/course.controller.js";

export const courseRouter = Router();

courseRouter.get("/course",asyncHandler(getAll));
courseRouter.get("/course/status",asyncHandler(myCoursesStatus));
courseRouter.get("/course/:id",asyncHandler(courseWithLessons));
courseRouter.post("/course",auth,asyncHandler(add))
courseRouter.put("/course",auth)
courseRouter.delete("/course/:courseId",auth,asyncHandler(deleteCourseHandler))