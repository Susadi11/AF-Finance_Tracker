const BudgetController = require('../models/Budget');
const User = require('../models/User');

exports.createBudget = async (req, res) => {
    try{
        const { user, category, amount, currency, period, startDate, endDate, notifications } = req.body;

        const savedUser = await User.findById(user); //check if user exists in DB //check if user exists in DB
        if (!savedUser) {
            return res.status(500).json({error: 'Transaction not attached to saved user'});
        }

        const newBudget = new Budget({ user, category, amount, currency, period, startDate, endDate, notifications });
        await newBudget.save();
        console.log("Budget saved successfully" + res);
        res.status(201).json({message: "Budget saved successfully" , budget: newBudget});
    } catch (error) {
        console.error('Error creating Budget', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find();
        console.log("Budget list :  ", budgets);
        res.status(200).json(budgets);
    } catch (error) {
        console.error("Error getting budget list : ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.getBudgetById = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findById(id);
        console.log("Successfully retrieved budget", budget);

        if (!budget) {
            return res.status(404).json({error: "Budget not found"});
        }
        res.status(200).json(budget);
    } catch (error) {
        console.error("Error getting budget list : ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, category, amount, currency, period, startDate, endDate, notifications  } = req.body;

        const savedUser = await User.findById(user); //check if user exists in DB //check if user exists in DB
        if (!savedUser) {
            return res.status(500).json({error: 'Transaction not attached to saved user'});
        }

        const updatedBudget = await Budget.findByIdAndUpdate(id, { user, category, amount, currency, period, startDate, endDate, notifications  }, {new: true});
        console.log("Successfully updated Budget", res);

        if(!updatedBudget) {
            return res.status(404).json({error: "Budget not found"});
        }
        res.status(200).json({message: "Updated budget successfully", updatedBudget});
    } catch (error) {
        console.error("Error updating Budget", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBudget = await Budget.findByIdAndDelete(id);
        console.log("Successfully deleted budget" + res);

        if (!deletedBudget) {
            return res.status(404).json({error: "Budget not found"});
        }
        res.status(200).json({message: "Budget deleted successfully", deletedBudget});
    } catch (error) {
        console.error("Error deleting Budget", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};
