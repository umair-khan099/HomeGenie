import { Router } from "express";
import { becomeWorkerController } from "../controllers/workerController.js";

const workerRouter = Router();

workerRouter.post("/become-worker", becomeWorkerController);

export default workerRouter;
