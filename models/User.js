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
    if(this.friends){
        return this.friends.length 
    }else {
        return 0
    }
   
})
const User = model('User', userSchema);

module.exports = User;