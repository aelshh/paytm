import express from "express";
import { router } from "./user";

export const router = express.Router();

router.use("/user", userRouter);
