import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Query: {
    //get all transactions of the currently authorized user
    transactions: async (_, __, context) => {
      try {
        const user = await context.getUser();

        if (!user) throw new Error("Unauthorized");

        const userId = user._id;

        const transactions = await Transaction.find({ userId: userId });

        return transactions;
      } catch (error) {
        console.error("error in all transactions query", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    //get a specific transaction
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("error in transaction query", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    categoryStatistics: async (_, __, context) => {
      if (!context.getUser())
        throw new Error("Unauthorized category statistics");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId: userId });

      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },

  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const user = await context.getUser();

        const { description, paymentType, category, amount, date, location } =
          input;

        if (!description || !paymentType || !category || !amount || !date) {
          throw new Error("All fields are required");
        }

        const newTransaction = new Transaction({
          userId: user._id,
          description: description,
          paymentType: paymentType,
          category: category,
          amount: amount,
          date: date,
          location: location || "",
        });

        await newTransaction.save();

        return newTransaction;
      } catch (error) {
        console.error("error in createTransaction", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const { transactionId } = input;
        if (!transactionId) throw new Error("Transaction ID is required");

        const updatedTransaction = await Transaction.findByIdAndUpdate(
          transactionId,
          input,
          { new: true }
        );

        return updatedTransaction;
      } catch (error) {
        console.error("error in updateTransaction", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );

        return deletedTransaction;
      } catch (error) {
        console.error("error in deleteTransaction", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },

  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error getting user:", err);
        throw new Error("Error getting user");
      }
    },
  },
};

export default transactionResolver;
