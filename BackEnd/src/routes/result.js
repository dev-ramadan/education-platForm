import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { add, myResults, allResults } from "../controller/result.controller.js";

export const resultRouter = Router();

resultRouter.post("/result", auth, asyncHandler(add));
resultRouter.get("/result/my-results", auth, asyncHandler(myResults));
resultRouter.get("/result/all", auth, asyncHandler(allResults));
