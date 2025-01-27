import express from "express"
import { protectRoute } from "../middlewares/auth-middleware.js";
import { getUserForSidebar, getMessage, sendMessage } from "../controllers/message-controller.js";


export const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:receiverId", protectRoute, getMessage );
messageRouter.post("/:receiverId", protectRoute, sendMessage );