import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
