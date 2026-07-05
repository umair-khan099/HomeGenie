import app from "./app.js";
import dbConnect from "./config/db.config.js";
import { connectRabbitMQ } from "./config/rabbitMQ.config.js";

const startServer = async () => {
  await dbConnect();
  await connectRabbitMQ();
  app.listen(3002, () => {
    console.log("User service is running at port :: 3002");
  });
};

startServer();
