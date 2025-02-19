const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const {name, userName, password, role, preferences} = req.body;

        const existingUser = await User.findOne({userName});
        if (existingUser) {
            return res.status(400).json({
                error: "User already exists",
            })
        }

        const hashedPw = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            userName,
            password: hashedPw,
            role: role || 'user',
            preferences: preferences || {
                currency: "LKR",
                notificationPreferences: {
                    budgetAlerts: true,
                    goalReminders: true
                }
            }
        });
        await newUser.save();

        res.status(201).json({message: "User Registered Successfully"});
    } catch (error) {
        console.log("Error creating User", error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.login = async (req, res) => {
    try{
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({message: 'User logged in successfully', token});
    } catch (error) {
        console.error("Error logging in", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}