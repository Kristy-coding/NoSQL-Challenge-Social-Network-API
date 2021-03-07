const router = require('express').Router();

//Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly.
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../constrollers/user-controller');

//Before we import the controller methods, let's dissect this new Express.js Router setup. Instead of creating duplicate routes for the individual HTTP methods, we can combine them!

//The following variations achieve the same goal:

// this code
//router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
//router.get('/', getCallbackFunction);
//router.post('/' postCallbackFunction);

//Remember, there's nothing wrong with how we've set up the routes and controllers in previous projects! This is just an alternative approach, with the benefit of easier-to-read code. The downside is having more files to import and export, which could making tracking more difficult.


// Set up GET all and POST at /api/users
//See how we simply provide the name of the controller method as the callback? That's why we set up those methods to accept req and res as parameters!
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);



//api/users/:userId/friends/:friendId-------------------------//
 router
   .route('/:userId/friends/:friendId')
   .post(addFriend)
   .delete(deleteFriend)



module.exports = router;
//We've already set up the export for this Router instance here, so all we have to do now is get the routes hooked into the entire server via index files