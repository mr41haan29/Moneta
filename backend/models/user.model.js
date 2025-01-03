import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
