const { User, Thought } = reqire('../models');

const thoughtController = {

    // route api/thoughts -------------------------------------//

    // GET to get all thoughts 
    getAllThoughts(){

    },

    //GET to get a single thought by it's _id
    getThoughById(){

    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field )
    addThought(){
        // example data
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino",
        //     "userId": "5edff358a0fcb779aa7b118b"
        // }

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