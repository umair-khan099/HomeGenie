import express, { Application } from "express";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile.route.js";
import fileUpload from "express-fileupload";
import workerRouter from "./routes/worker.rourte.js";

const app: Application = express();

dotenv.config();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.use(express.json());
app.use("/", profileRouter);
app.use("/", workerRouter);

export default app;
