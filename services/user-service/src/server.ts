import app from "./app.js";
import dbConnect from "./config/db.config.js";
import { connectRabbitMQ } from "./config/rabbitMQ.config.js";
import { profileConsumer } from "./consumer/profileConsumer.js";

const startServer = async () => {
  await dbConnect();
  await connectRabbitMQ();
  await profileConsumer();
  app.listen(3002, () => {
    console.log("User service is running at port :: 3002");
  });
};

startServer();
