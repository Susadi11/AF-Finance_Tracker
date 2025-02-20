const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TransactionSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String,
    }],
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurringDetails: {
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
        },
        startDate: { type: Date},
        endDate: { type: Date},
        lastProcessed: { type: Date}
    },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
