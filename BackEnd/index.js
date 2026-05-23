import express from "express";
import cors from "cors";
import bootstrap from "./src/app.js";

const app = express();

app.use(cors({
    origin: [
        "https://edu-plat-form.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ 2. JSON parser
app.use(express.json());

// ✅ 3. health check
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// ✅ 4. bootstrap AFTER middleware
bootstrap(app, express);

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log("server is running on port", port);
});

export default app;