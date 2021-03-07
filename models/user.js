const { Schema, model } = require('mongoose');

const Thought = require('./thought');

//const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    //Array of _id values referencing the Thought model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'

        }
    ],
    //Array of _id values referencing the User model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{toJSON: {virtuals: true},id:false})


UserSchema.post('findOneAndDelete', function(doc){
    // befor a user gets deleted
    
        const userThoughtArr = doc.thoughts
        console.log(userThoughtArr);

        Thought.deleteMany({_id: {$in: userThoughtArr}})
            .then(result => console.log('Thoughts deleted!',result))
            .catch(err => console.log(err))
            // .then(dbThoughtData => {console.log(dbThoughtData)})
            // .catch(err=> {console.log(err)})
    // find and delete all userThoughts in the array
})


//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;