import { User } from "../models/user-model.js";
import { Message } from "../models/message-model.js";
import cld from "../libs/cloudinary.js";
import { getReceiverSocketId , io} from "../libs/socket.js";

export const getUserForSidebar = async(req,res)=>{
    try {
        const myId = req.user._id;
        const otherUsers = await User.find({ _id : { $ne : myId }}).select("-password");

        res.status(200).json(otherUsers);
    }catch(err){
        console.log("geetUserForSidebar error: ", err.message);
        return res.status(500).json({
            msg : "internal sever error"
        })
    }
};

export const getMessage = async (req,res)=>{
    try{
        const { receiverId } = req.params;
        const myId = req.user._id;
        // fetch messages 
        const messages = await Message.find({
            $or : [
                {senderId: myId , receiverId : receiverId },
                {senderId: receiverId, receiverId: myId}
            ]
        });

        return res.status(200).json(messages);
    }catch(err){
        console.log("getMessage error: ", err.message);
        return res.status(500).json({
            msg : "internal sever error"
        })
    }
};

export const sendMessage = async(req,res)=>{
    try{
        const { receiverId } = req.params;
        const senderId = req.user._id;
        const { text, image } = req.body;

        // handle image
        let imageUrl;
        if(image){
            const uploadToCld = await cld.uploader.upload(image);
            imageUrl = uploadToCld.secure_url;
        };

        // create message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        });
        await newMessage.save();

        //  socketIo implementation
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){  // means user is online/active
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    }catch(err){
        console.log("sendMessage error: ", err.message);
        return res.status(500).json({
            msg : "internal sever error"
        })
    }
};