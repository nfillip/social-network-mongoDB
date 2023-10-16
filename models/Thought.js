const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, 
        required: [true, "thoughtText required"],
        min: 1, 
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return Date(date)
        }
    },
    username: {//user that created this thought??
        type: String, 
        required: [true, "Username required"], 
    },
    reactions: [{ref: 'Reaction'}],
})

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;