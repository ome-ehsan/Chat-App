import jwt from "jsonwebtoken"
import { User } from "../models/user-model.js"


export const protectRoute = async (req, res, next)=>{
    try{
        // check for token
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                msg : "unauthorized user - no token provided"
            })
        };
        // decode the jwt to get the id from the token
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!decodedToken){
            return res.status(401).json({
                msg : "unauthorized user - invalid token"
            })
        };
        // token provided, then validate
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(404).json({
                msg : "user not found"
            })
        };
        req.user = user;
        next();
    }catch(err){
        console.log("protect route error: ", err.message);
        return res.status(500).json({
            msg : "internal sever error"
        });
    }   
};