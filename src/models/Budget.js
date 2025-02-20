const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const BudgetSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    period: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    notifications: {
        enabled: { type: Boolean, default: false },
        threshold: { type: Number, default: 0 }
    }
});

const Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;