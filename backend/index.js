import express from "express";
import { router as mainRouter } from "./routes/index.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen("3000");
