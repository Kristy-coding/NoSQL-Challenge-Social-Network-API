// the default will be /models/index.js where we stored all the models
const { User } = require('../models');



const userController = {

    //route api/users-----------------//
    //get all users 
    getAllUsers(){

    },

    // get a single user by it's _id and populated thought and friend data
    getUserById(){

    },

    // POST a new user
    createUser(){
    // example data
    //{
    // "username": "lernantino",
    // "email": "lernantino@gmail.com"
    //}

    },

    // PUT to update a user by it's _id
    updateUser(){

    },

    // DELETE to remove user by it's _id
    deleteUser(){
        //BONUS: Remove a user's associated thoughts when deleted.

    },

    //api/users/:userId/friends/:friendId-------------------------//

    // POST to add a friend to a user's friend list
    addFriend(){

    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend(){

    }

}

module.exports = userController;