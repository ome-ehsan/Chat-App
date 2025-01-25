import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
            minlength: 6
        },
        fullName : {
            type : String,
            required : true
        },
        profilePicture : {
            type : String,
            default : ""           
        }
    },
    { timestamps : true }
);

export const User = mongoose.model("User", userSchema);
