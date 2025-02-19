const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin' , 'user'],
        default: 'user',
        required: true
    },
    preferences: {
        currency: {
            type: String,
            default: 'LKR',
            required: true
        },
        notificationPreferences: {
            budgetAlerts: {
                type: Boolean,
                default: true
            },
            goalReminders: {
                type: Boolean,
                default: true
            }
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;