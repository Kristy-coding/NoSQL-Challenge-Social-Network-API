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
    // api/thoughts/:id
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

    // api/thoughts
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

    // api/thoughts/:id
    // PUT to update a thought by it's _id 
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found at this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(404).json(err));

    },

     // api/thoughts/:id
    // DELETE to remove a though by it's _id 
    deleteThought({params}, res){
        Thought.findOneAndDelete({ _id: params.id})
            .then (dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found at this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // routes api/thoughts/:thoughtId/reactions
    //POST to create a reaction stored in a single thought's reactions array field 
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found at that id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));

    },

    // routes api/thoughts/:thoughtId/reactionId
    //DELETE to $pull and remove a reaction by the reation's reactionId value 
    deleteReaction({ params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $pull: {reactions: params.reactionId}},
            {new: true})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
}


module.exports = thoughtController;