import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  //GET requests
  Query: {
    //get the authenticated user
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("error in authUser query", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    //get a specific user
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.error("error in user query", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },

  //POST, PATCH, DELETE requests
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { name, username, password, gender } = input;

        if (!name || !username || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username: username });

        //check if username is taken
        if (existingUser) {
          throw new Error("Username is already taken");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture = `https://avatar.iran.liara.run/public/${
          gender === "male" ? "boy" : "girl"
        }?username=${username}`;

        const newUser = new User({
          name: name,
          username: username,
          password: hashedPassword,
          gender: gender,
          profilePicture: profilePicture,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("error in signup", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        if (!username || !password) {
          throw new Error("Please fill in all the fields");
        }

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);

        return user;
      } catch (error) {
        console.error("error in login", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });

        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("error in logout", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },

  //TODO: add user/transaction relation
};

export default userResolver;
