const { Schema, model, Types } = require('mongoose');

//const dateFormat = require('../utils/dateFormat');


//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxlength: [280, 'reaction must be 280 characters or less!']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
       // get: createdAtVal => dateFormat(createdAtVal)

    }

},{toJSON: {getters: true}});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required:true,
        trim: true,
        minlength: [4, 'thought must be greater than 1 character'],
        maxlength: [280, 'thought cannot be longer than 280 characters']

    },
    createdAt :{
        type: Date,
        default: Date.now,
        //get: createdAtVal => dateFormat(createdAtVal)

    },
    //The user that created this thought
    username: {
        type: String,
        required: true

    },
    //Array of nested documents created with the reactionSchema
    //subdocument 
    reactions: [ReactionSchema]

},{toJSON: {virtuals: true, getters: true}})

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;