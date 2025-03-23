import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

        res.status(200).json({ message: "User found!" });
    } catch (error) {
        console.log("Error in getUsersForSidebar Controller", error.message)
        res.status(500).json({
            message: "Internal Server Error!!"
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const userToChatId = req.params.id;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                }
            ]
        })

        res.status(200).json({ messages });
    } catch (error) {
        console.log("Error in getMessages Controller", error.message)
        res.status(500).json({
            message: "Internal Server Error!!"
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const myId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // todo: implement socket.io for realtime chatting functionalty


        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage Controller", error.message)
        res.status(500).json({
            message: "Internal Server Error!!"
        });
    }
};