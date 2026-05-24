import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getStats } from "../controller/dashboard.controller.js";

export const dashboardRouter = Router();

dashboardRouter.get("/dashboard/stats", auth, asyncHandler(getStats));
