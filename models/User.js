const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: [true, "Username required"], 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: "Need a real email address"
        }
    },
    thoughts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [this]
})

const User = mongoose.model('User', userSchema);

module.exports = User;