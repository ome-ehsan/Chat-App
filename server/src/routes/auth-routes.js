import express from "express"
import { signup, login, logout, updateProfile, returnUser} from "../controllers/auth-controllers.js";
import { protectRoute } from "../middlewares/auth-middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/updateProfile", protectRoute, updateProfile);
authRouter.get("/check", protectRoute, returnUser);
