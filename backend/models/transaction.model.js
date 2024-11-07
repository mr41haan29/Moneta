import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unkown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
