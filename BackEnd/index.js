import express from "express";
import cors from "cors";
import bootstrap from "./src/app.js";
import serverless from "serverless-http";

const app = express();

// ✅ CORS لازم يكون قبل أي routes
app.use(cors({
    origin: [
        "https://edu-plat-form.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// مهم للـ preflight في serverless
app.options("*", cors());

// JSON parser
app.use(express.json());

// health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running 🚀"
    });
});

// bootstrap (لازم await أو promise-safe)
bootstrap(app, express);

// ❗ مهم: export handler مش app
export const handler = serverless(app);