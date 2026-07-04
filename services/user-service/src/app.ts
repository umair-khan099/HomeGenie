import express, { Application } from "express";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile.route.js";

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use("/", profileRouter);

export default app;
