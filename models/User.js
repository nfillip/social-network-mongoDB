const {Schema, model} = require('mongoose');

const userSchema = new Schema({
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
        //potentially use match here if we need
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: "Need a real email address"
        }
    },
    thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],

},
{
    toJSON: {
        virtuals: true
    },
    id: false,
})

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})
const User = model('User', userSchema);

module.exports = User;