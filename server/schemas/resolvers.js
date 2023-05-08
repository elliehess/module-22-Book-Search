const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


// followed user-controllers.js for guidance 
const resolvers = {
    Query: {
		me: async (parent, { userId }) => {
			const foundUser = await User.findOne({ _id: userId });

			if (!foundUser) {
				throw new Error('No user found with that ID!');
			}

			return foundUser;
		},
	},
    Mutation: {
      addUser: async (parent, {username, email, password}) => {
        const user = await User.create({ username, email, password} );
        const token = signToken(user);
        return {token, user};
      },
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne(
          { email });
          if (!user) throw new AuthenticationError('No profile found');

          const correctPw = await user.isCorrectPassword(password)

          if (!correctPw) throw new AuthenticationError('Incorrect password!');
          const token = signToken(user);
        return {token, user};
      },
      saveBook: async (parent, { userId, bookData }) => {
        const user = await User.findOneAndUpdate(
          { _id: userId }, {$addToSet: {savedBooks: bookData}}, {new:true, runValidators: true}
          );
        return user;
      },

      removeBook: async (parent, { userId, bookData }) => {
        const user = await User.findOneAndUpdate(
          { _id: userId }, {$pull: {savedBooks: bookData}}, {new: true}
          );
        return user;
      },
    },
  };

module.exports = resolvers;
