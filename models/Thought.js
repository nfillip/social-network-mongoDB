const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction-schema')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true,
        minLength: 1, 
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //go back to this to test
        get: (date) => { return date.split("T")[0]
        }
    },
    username: {
        type: String,
        required: [true, "Username required"], 
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true, 
        getters: true
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})
const Thought = model('thought', thoughtSchema);

module.exports = Thought;