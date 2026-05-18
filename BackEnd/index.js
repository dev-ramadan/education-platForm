import express from "express";
import cors from "cors";
import bootstrap from "./src/app.js";

const app = express();

// ✅ CORS
app.use(cors({
    origin: [
        "https://edu-plat-form.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ مهم للـ preflight
app.options('*', cors());

// ✅ JSON
app.use(express.json());

// ✅ route بسيط للـ health check
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// ✅ شغل السيرفر الأول
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log("server is running on port", port);
});

// ✅ بعد كده شغل الـ bootstrap
bootstrap(app, express).catch(err => {
    console.error("Bootstrap error:", err);
});