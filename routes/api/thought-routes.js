const router = require('express').Router();

//Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly.
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
    
  } = require('../../constrollers/thought-controller');

// route api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// // route api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  







module.exports = router;
//We've already set up the export for this Router instance here, so all we have to do now is get the routes hooked into the entire server via index files