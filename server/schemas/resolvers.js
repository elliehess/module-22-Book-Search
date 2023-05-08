const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
		user: async (parent, { userId }) => {
			const foundUser = await User.findOne({ _id: userId });

			if (!foundUser) {
				throw new Error('No user found with that ID!');
			}

			return foundUser;
		},
	},
    Mutation: {
      createUser: async (parent, {username, email, password}) => {
        const user = await User.create({ username, email, password} );
        const token = signToken(user);
        return {token, user};
      },
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne(
          { email });
          const token = signToken(user);
        return {token, user};
      },
      saveBook: async (parent, { userId, bookData }) => {
        const user = await User.findOneAndUpdate(
          { _id: userId }, {$addToSet: {savedBooks: bookData}}, {new:true, runValidators: true}
          );
        return user;
      },

      deleteBook: async (parent, { userId, bookData }) => {
        const user = await User.findOneAndUpdate(
          { _id: userId }, {$pull: {savedBooks: bookData}}, {new: true}
          );
        return user;
      },
    },
  };

module.exports = resolvers;
