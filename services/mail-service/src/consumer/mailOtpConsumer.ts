import { getRabbitMqChannel, MAIL_QUEUE } from "../config/rabbitMQ.confg.js";
import { sendMailService } from "../services/mail.service.js";

export const mailOtpConsumer = () => {
  const channel = getRabbitMqChannel();

  channel.consume(MAIL_QUEUE, async (message) => {
    if (message !== null) {
      try {
        await sendMailService(JSON.parse(message?.content.toString()));
        channel.ack(message);
      } catch (error) {
        channel.nack(message);
      }
    }
  });
};
