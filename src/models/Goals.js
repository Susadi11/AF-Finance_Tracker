const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const GoalSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    autoAllocate: {
        enabled: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
        }
    },
});

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;