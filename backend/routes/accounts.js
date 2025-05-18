import express from "express";
import { authMiddleware } from "./middleware.js";
import { z } from "zod";
import { accountModel } from "../db.js";
import mongoose from "mongoose";

export const router = express.Router();

const transferSchema = z.object({
  to: z.string(),
  amount: z.number(),
});

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await accountModel.findOne({
      userId: req.userId,
    });
    return res.status(200).json({
      balance: account.balance,
    });
  } catch (e) {
    console.error(e);
    return res.json({
      message: "Some unexpected error occured",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const parsed = transferSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid Input",
      error: parsed.error.errors,
    });
  }

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const { to: receiverId, amount } = parsed.data;

    const account = await accountModel
      .findOne({
        userId: req.userId,
      })
      .session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const receiverAccount = await accountModel
      .findOne({
        userId: receiverId,
      })
      .session(session);

    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    await accountModel
      .updateOne(
        { userId: req.userId },
        {
          $inc: { balance: -amount },
        }
      )
      .session(session);

    await accountModel
      .updateOne(
        { userId: receiverId },
        {
          $inc: { balance: amount },
        }
      )
      .session(session);

    await session.commitTransaction();
    res.json({
      message: "Transaction Succesfull",
    });
  } catch (e) {
    await session.abortTransaction();
    console.error(e);
    res.json({
      message: "Unexpected Error",
    });
  } finally {
    await session.endSession();
  }
});
