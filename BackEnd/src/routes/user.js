import {Router} from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { addUser, getInstructor, loginUser, users } from "../controller/user.controller.js"
import { saveToken } from "../controller/sasveToken.controller.js";

export const userRouter = Router()

userRouter.post("/create",asyncHandler(addUser));
userRouter.post("/login",asyncHandler(loginUser));
userRouter.get("/users",asyncHandler(users))
userRouter.get("/instructor/:id",asyncHandler(getInstructor))
userRouter.post("/save-token", saveToken);


