import express from "express";
import { z } from "zod";

import { userModel } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountModel } from "../db.js";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware.js";
export const router = express.Router();
dotenv.config();
const signupSchema = z.object({
  username: z.string().email().min(3).max(30),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  password: z
    .string()
    .min(3)
    .max(50)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[0-9]/),
});

const signinSchema = z.object({
  username: z.string().email().min(3).max(30),
  password: z
    .string()
    .min(3)
    .max(50)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[0-9]/),
});

const updateSchema = z.object({
  firstName: z.string().min(3).max(50).optional(),
  lastName: z.string().min(3).max(50).optional(),
  password: z
    .string()
    .min(3)
    .max(50)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .optional(),
});

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (parsed.success) {
    const { username, firstName, lastName, password } = req.body;
    const existUser = await userModel.findOne({
      username: username,
    });

    if (existUser) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        username,
        firstName,
        lastName,
        password: hashedPassword,
      });

      const balance = Math.floor(Math.random() * 10000);
      const account = await accountModel.create({
        userId: user._id,
        balance: balance,
      });

      if (user && account) {
        return res.status(200).json({
          message: "User created succesfully",
        });
      }
    }
  } else {
    return res.json({
      message: "Invalid credentials",
      error: parsed.error.errors,
    });
  }
});

router.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);

  if (parsed.success) {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({
      username: username,
    });

    if (!existingUser) {
      return res.json({
        message: "User doest not exists",
      });
    }

    const checkPass = await bcrypt.compare(password, existingUser.password);

    if (!checkPass) {
      return res.json({
        message: "Incorrect Password ",
      });
    }

    const userId = existingUser._id;

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      token: token,
    });
  } else {
    return res.json({
      message: "Invalid credentials",
      error: parsed.error.errors,
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.json({
      message: "Invalid inputs",
      error: parsed.error.errors,
    });
  }

  const updates = { ...parsed.data };

  const userId = req.userId;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Updated Succesfully",
    });
  } catch (e) {
    console.error(e);
    return res.json({
      message: "Some unexpected erorr",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await userModel.find(
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      },
      "_id firstName lastName username"
    );
    if (!users) {
      return res.json({
        message: "No such user found",
      });
    }

    return res.status(200).json({
      users,
    });
  } catch (e) {
    console.error(e);
    return res.json("Some error occurred");
  }
});
