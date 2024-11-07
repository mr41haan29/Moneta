import { users } from "../dummy/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },

    user: (_, { userId }) => {
      return users.find((user) => userId === user._id);
    },
  },
  Mutation: {},
};

export default userResolver;
