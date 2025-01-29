import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth-routes.js";
import { messageRouter } from "./routes/message-routes.js";
import { connectDB } from "./libs/db-config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config()

const port = process.env.PORT || 8001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true
}));
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});
