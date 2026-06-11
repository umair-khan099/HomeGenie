import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
import { authRouter } from "./routes/auth.route.js";
app.use("/", authRouter);
app.use(errorHandler);
export default app;
