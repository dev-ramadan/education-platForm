import express from "express"
import cors from "cors";
import bootstrap from "./src/app.js"
const app = express()
app.use(cors());
const port = process.env.PORT || 3000
bootstrap(app, express)
app.listen(port, "0.0.0.0", () => {
    console.log("server is running on port", port);
});