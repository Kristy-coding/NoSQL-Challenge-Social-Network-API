// the default will be /models/index.js where we stored all the models
const { User, Thought } = require('../models');



const userController = {

    //route api/users-----------------//
    //get all users 
    getAllUsers(req,res){
        User.find({})
            .populate({path: 'thoughts', select: '-__v'})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch( err => {
                res.status(400).json(err);
            });

    },

    // get a single user by it's _id and populated thought and friend data
    getUserById({params}, res){
        User.findOne({ _id: params.id })
            .populate({path: 'thoughts', select: '-__v'})
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({
                        message: 'No user found with this id!'
                    })
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err=> {
                console.log(err);
                res.status(404).json(err);
            });

    },

    // POST a new user
    createUser({ body}, res){
    // example body data
    //{
    // "username": "lernantino",
    // "email": "lernantino@gmail.com"
    //}
        User.create(body)
            //.select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));

    },

    // PUT to update a user by it's _id
    // api/users/:id
    updateUser({params, body}, res){
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(404).json(err));

    },

    // DELETE to remove user by it's _id
    deleteUser({ params}, res){

        User.findOneAndDelete({ _id: params.id })
            .then (dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err=> res.status(400).json(err));
        //BONUS: Remove a user's associated thoughts when deleted.
        
    },


    // api/users/:userId/friends/:friendId
    // POST to add a friend to a user's friend list
    addFriend({params}, res){
        User.findOneAndUpdate(
            //where
            { _id: params.userId },
            // what are we updating
            { $push: { friends: params.friendId}},
            // return updated document
            // and run validators on updated document
            { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No User found with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err=> res.json(err));

    },

    // DELETE to remove a friend from a user's friend list
     //api/users/:userId/friends/:friendId-------------------------//
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            //where
            { _id: params.userId },
            // what are we updating
            { $pull: { friends: params.friendId}},
            // return updated document
            // and run validators on updated document
            { new: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No User found with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err=> res.json(err));

    }

}

module.exports = userController;