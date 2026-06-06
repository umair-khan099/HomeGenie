import express, { Application } from "express";
import { errorHandler } from "./middlewares/error.middleware.js";

export const app: Application = express();

app.use(errorHandler);
