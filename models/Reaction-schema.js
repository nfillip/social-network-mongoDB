const {Schema} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280,
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //go back to this to test
        get: (date) => { return date
        }
    },

},
{
    toJSON: {
        getters: true
    },
    id: false
})

// const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = reactionSchema;