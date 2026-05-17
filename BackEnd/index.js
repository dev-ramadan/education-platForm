// import express from "express"
// import cors from "cors";
// import dotenv from "dotenv";
// import bootstrap from "./src/app.js"

// dotenv.config();

// const app = express()
// app.use(cors());
// const port = process.env.PORT || 3000
// bootstrap(app, express)
// app.listen(port , ()=>{
//     console.log("server is running on port " , port);
// });

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import bootstrap from "./src/app.js";

dotenv.config();

const app = express();
app.use(cors());

// 👇 مهم نحط await
await bootstrap(app, express);

// ❌ مفيش app.listen

// ✅ ده اللي Vercel بيستخدمه
export default serverless(app);