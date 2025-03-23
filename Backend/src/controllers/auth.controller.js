import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js"
import cloudinary from './../lib/cloudinary.js';

export const signup = async (req, res) => {
    // res.send("Signup Route");
    console.log(req.body);
    const { fullName, email, password } = req.body
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be of minimum 6 characters" });
        }
        const user = await User.findOne({ email });


        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        //hash password
        // How bcrypt works is it generates a random piece of word of fixed length and adds it to the original password making it almost impossible to decode unless the salt is known.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic

            })
        }
        else {
            return res.status(400).json({ message: "Invalid User Data" })
        }

    } catch (error) {
        console.log("Error in Signup Controller", error.message)
        res.status(500).json({
            message: "Internal Server Error!!"
        });
    }
};

export const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.log("Error in Login Controller", error.message)
        res.status(500).json({
            message: "Internal Server Error!!"
        });
    };
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body; //only fetches the variable mentioned in the {} this is called object destructuring
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "No Profile Pic provided" });
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadRes.secure_url }, { new: true });

        res.status(200).json({ message: "Profile Picture Updated Successfully" });

    } catch (error) {
        console.log("Error in updateProfile Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}