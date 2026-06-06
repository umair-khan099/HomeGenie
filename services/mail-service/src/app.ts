import express, { Application } from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { mailRouter } from "./routes/mail.routes.js";

export const app: Application = express();

app.use(express.json());
app.use("/api/v1", mailRouter);
app.use(errorHandler);
