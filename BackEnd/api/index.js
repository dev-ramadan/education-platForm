import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import bootstrap from "../src/app.js";

dotenv.config();

const app = express();
app.use(cors());

await bootstrap(app, express);

// 👇 ده المهم
export default serverless(app);