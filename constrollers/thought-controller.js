const { User, Thought } = require('../models');

const thoughtController = {

    // route api/thoughts -------------------------------------//

    // GET to get all thoughts 
    getAllThoughts(req,res){
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch( err=> {
                res.status(400).json(err);
            });

    },

    //GET to get a single thought by it's _id
    getThoughtById({params}, res){
        Thought.findOne({ _id: params.id})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found by that id'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });

    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field )
    addThought({ params, body}, res){
        // example data
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino",
        //     "userId": "5edff358a0fcb779aa7b118b"
        // }
        Thought.create(body)
            .then(({_id})=> {
                return User.findOneAndUpdate(
                    { _id:body.userId},
                    { $push: {thoughts: _id}},
                    { new: true}
                );
            })
            .then (dbUserData=> {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));        

    },

    // PUT to update a thought by it's _id 
    updateThought(){

    },

    // DELETE to remove a though by it's _id 
    deleteThought(){

    },

 // routes api/thoughts/:thoughtId/reactions
    //POST to create a reaction stored in a single thought's reactions array field 
    addReaction(){

    },

    //DELETE to $pull and remove a reaction by the reation's reactionId value 
    deleteReaction(){

    }


}


module.exports = thoughtController;