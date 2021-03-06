//Again, like you did with Sequelize, you'll create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions.

// are going to reqire the /models/index.js folder in our controllers files 

const User = require('./user');
const Thought = require('./thought');

module.exports = { User, Thought };
