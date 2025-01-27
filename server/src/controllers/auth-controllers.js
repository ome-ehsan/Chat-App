import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs"
import { generateJWT } from "../libs/utils.js";
import cld from "../libs/cloudinary.js";

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
};

export const login = async (req,res)=>{
        //first fetch email and pass
        const {email, password} = req.body;
    try{

        //now check if credentials exist
        if(!email || !password){
            return res.status(400).json( {msg : "invalid credentials"} );
        };
        // if provided check whether user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json( {msg : "user doesn't exist"} );
        };
        // if passwrd is provided check if its valid
        const isValidPass = await bcrypt.compare(password, user.password); 
        if(!isValidPass){
            return res.status(400).json( {msg : "invalid credentials"} );
        };

        generateJWT(user._id,res);
        return res.status(200).json({
            _id : user._id,
            email : user.email,
            fullName : user.fullName,
            profilePicture : user.profilePicture
        });
    }catch(err){
        console.log(`Login up error : ${err.message}`);
        return res.status(500).json({ msg : "internal server error"});
    }
};

export const logout = (req,res)=>{
    try{
        res.cookie("jwt", "", { maxAge : 0 });
        return res.status(200).json({
            msg : "logged out successfully"
        });

    }catch(err){
        console.log("logout error: ", err.message);
        return res.status(500).json({
            msg: "internal server error"
        });
    }
};

export const updateProfile = async (req,res)=>{
    try{
        const {profilePicture} = req.body;
        const userId = req.user._id;

        if(!profilePicture){
            return res.status(400).json({
                msg : "profile picture is required"
            })
        };

        const uploadToCld = await cld.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture : uploadToCld.secure_url}, {new:true} );
        return res.status(200).json(updatedUser);
    }catch(err){
        console.log("Update Error: ", err.message);
        return res.status(500).json({
            msg : "internal server error"
        })
    }
};

export const returnUser = (req,res)=>{
    try{
        return res.status(200).json(req.user);
    }catch(err){
        console.log("check route error: ", err.message);
        return res.status(500).json({
            msg : "internal server error"
        })
    }
};


