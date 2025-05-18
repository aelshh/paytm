import mongoose from "mongoose";
import { number } from "zod";
mongoose.connect(
  "mongodb+srv://adarsh9919:bf5bUl8jLnS3AQ3D@cluster0.a4s92bw.mongodb.net/"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const userModel = mongoose.model("User", userSchema);
const accountModel = mongoose.model("Account", accountSchema);

export { userModel, accountModel };
