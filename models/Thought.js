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
        get: (date) => { return date.toString()
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
    if(this.reactions){
       return this.reactions.length 
    }else {
        return 0
    }
    
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;