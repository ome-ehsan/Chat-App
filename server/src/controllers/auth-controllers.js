import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs"
import { generateJWT } from "../libs/utils.js";

export const signup = async (req,res)=>{

    try{
        const { email, fullName , password } = req.body;
        if (!fullName || !email || !password){ 
            return res.status(400).json({ msg : "all fields are required"})
        };
        if (password.length < 6){ 
            return res.status(400).json( {
            msg : "password length must be at least 6 characters or more"
        })
        };

        //checking whether user exists or not
        const user = await User.findOne({email});
        if (user){ return res.status(400).json( {msg:"user already exists"} )};

        //time to hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //now new create a new user and save it to mongo db
        const newUser = new User({
            email,
            password : hashedPassword,
            fullName
        });

        if(newUser){
            // generate a jwt token and send it to the user in a cookie 
            generateJWT( newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePicture : newUser.profilePicture
            });
        } else{
            return res.status(400).json( {msg : "invalid user data"})
        }
    }catch(err){
        console.log(`Sign up error : ${err.message}`);
        return res.status(500).json({ msg : "internal server error"});
    }
}

export const login = (req,res)=>{
    res.status(200).send("Login page");
}

export const logout = (req,res)=>{
    res.status(200).send("Logout page");
}