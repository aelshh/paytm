import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { number } from "zod";

import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_URL);

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
