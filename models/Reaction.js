const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String, 
        required: true, 
        min: 1,
        max: 280,
    },
    username: {
        type: String, 
        required: [true, "Username required"], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return Date(date)
        }
    },

})

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;