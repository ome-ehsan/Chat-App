import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth-routes.js";
import { connectDB } from "./libs/db-config.js";
import cookieParser from "cookie-parser";
dotenv.config()

const port = process.env.PORT || 8001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});
