import { app } from "./app.js";
import { CONFIG } from "./config/dotenv.config.js";
import { connectRabbitMQ } from "./config/rabbitMQ.confg.js";
import { mailOtpConsumer } from "./consumer/mailOtpConsumer.js";

const startServer = async () => {
  await connectRabbitMQ();
  await mailOtpConsumer();
  app.listen(CONFIG.PORT, () => {
    console.log(`mail-server is runing at PORT : ${CONFIG.PORT}`);
  });
};

startServer();
