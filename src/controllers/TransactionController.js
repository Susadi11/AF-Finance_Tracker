const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { user, type, amount, currency, category, description, date, tags, isRecurring, recurringDetails } = req.body;
        const newTransaction = new Transaction({user, type, amount, currency, category, description, date, tags, isRecurring});
        await newTransaction.save();
        console.log("Transaction saved successfully" + res);
        res.status(201).json({message: "Transaction saved successfully", transaction: newTransaction});
    } catch (error) {
        console.error('Error creating transaction', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        console.log("Successful" + res);
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error getting transactions', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        console.log("Successfully retrieved transaction" + res);

        if (!transaction) {
            return res.status(404).json({error: 'Transaction not found'});
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Error retrieving transaction', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, type, amount, currency, category, description, date, tags, isRecurring, recurringDetails } = req.body;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, {user, type, amount, currency, category, description, date, tags, isRecurring, recurringDetails}, {new: true});
        console.log("Successfully updated transaction" + res);

        if (!updatedTransaction) {
            return res.status(404).json({error: 'Transaction not found'});
        }
        res.status(200).json({message: 'Transaction updated successfully', transaction: updatedTransaction});
    } catch (error) {
        console.error('Error updating transaction', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        console.log("Successfully deleted transaction" + res);

        if (!deletedTransaction) {
            return res.status(404).json({error: 'Transaction not found'});
        }
        res.status(200).json({message: 'Transaction deleted successfully'});
    } catch (error) {
        console.error('Error deleting transaction', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};