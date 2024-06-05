import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(201).json({ status: true, message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered." });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect password." });
        }
        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '15d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 36000000,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict'
        });
        return res.status(200).json({ status: true, message: "Login successful." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
});

router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not registered." });
        }

        // Generate a token
        const token = jwt.sign({ email: user.email }, process.env.KEY, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "deepakzende307@gmail.com",
                pass: "Deepak@866951",
            }
        });

        const mailOptions = {
            from: "deepakzende307@gmail.com",
            to: email,
            subject: 'Reset Password',
            text: `Click the following link to reset your password: http://localhost:3001/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email." });
            } else {
                return res.status(200).json({ status: true, message: "Email sent successfully." });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
});

export default router;
