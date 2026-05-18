import express from "express"
import cors from "cors";
import bootstrap from "./src/app.js"

const app = express()

app.use(cors({
    origin: [
        "https://edu-plat-form.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.options('*', cors()); // مهم جدًا للـ preflight

app.use(express.json()); // مهم لو بتبعت JSON

bootstrap(app, express)

const port = process.env.PORT || 3000

app.listen(port, "0.0.0.0", () => {
    console.log("server is running on port", port);
});