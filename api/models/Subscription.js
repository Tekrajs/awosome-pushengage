let mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    is_subscribed: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Subscriptions', SubscriptionSchema);