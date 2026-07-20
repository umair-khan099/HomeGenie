import { Router } from "express";
import {
  becomeWorkerController,
  getAllWorkerForVerificationController,
} from "../controllers/workerController.js";

const workerRouter = Router();

workerRouter.post("/become-worker", becomeWorkerController);
workerRouter.get("/become-worker-requests", getAllWorkerForVerificationController);

export default workerRouter;
