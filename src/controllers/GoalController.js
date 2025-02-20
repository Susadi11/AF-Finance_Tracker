const Goals = require("../models/Goals");
const User = require("../models/User");

exports.createGoal = async (req, res) => {
    try {
        const { user, title, description, targetAmount, currency, currentAmount, deadline, status, autoAllocate } = req.body;

        const savedUser = await User.findById({ user: user.id }); //check if user exists in DB
        if (!savedUser) {
            return res.status(500).json({error: 'Goal not attached to saved user'});
        }

        const newGoal = new Goals({ user, title, description, targetAmount, currency, currentAmount, deadline, status, autoAllocate });
        await newGoal.save();
        console.log("Goal created" + res);
        res.status(201).json({message: "Goal created successfully.", goal: newGoal});
    } catch (error) {
        console.error("Error creating Goal", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goals.find();
        console.log("Budget list :  ", goals);
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error getting goal list : ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goals.findById(id);
        console.log("Successfully retrieved goal", goal);

        if (!goal) {
            return res.status(404).json({error: "Goal not found"});
        }
        res.status(200).json(goal);
    } catch (error) {
        console.error("Error getting goal list : ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, title, description, targetAmount, currency, currentAmount, deadline, status, autoAllocate } = req.body;

        const savedUser = await User.findById({ user: user.id }); //check if user exists in DB
        if (!savedUser) {
            return res.status(500).json({error: 'Goal not attached to saved user'});
        }

        const updatedGoal = await Goals.findByIdAndUpdate(id, { user, title, description, targetAmount, currency, currentAmount, deadline, status, autoAllocate }, {new: true});
        console.log("Successfully updated Goal", res);

        if(!updatedGoal) {
            return res.status(404).json({error: "Goal not found"});
        }
        res.status(200).json({message: "Updated goal successfully", updatedGoal});
    } catch (error) {
        console.error("Error updating Goal", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGoal = await Goals.findByIdAndDelete(id);
        console.log("Successfully deleted goal" + res);

        if (!deletedGoal) {
            return res.status(404).json({error: "Goal not found"});
        }
        res.status(200).json({message: "Goal deleted successfully", deletedGoal});
    } catch (error) {
        console.error("Error deleting Goal", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};