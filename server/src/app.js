import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth-routes.js";
import { messageRouter } from "./routes/message-routes.js";
import { connectDB } from "./libs/db-config.js";
import cookieParser from "cookie-parser";
import {server, app} from "./libs/socket.js";
import cors from "cors";
import path from "path";
dotenv.config()

const port = process.env.PORT || 8001;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true
}));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static.path.join(__dirname, "../client/dist"));
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
}


server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});
