import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import bootstrap from "./src/app.js";

dotenv.config();

const app = express();
app.use(cors());

let initialized = false;

const init = async () => {
  if (!initialized) {
    await bootstrap(app, express);
    initialized = true;
  }
};

export default function handler(req, res) {
  res.status(200).json({ ok: true });
}