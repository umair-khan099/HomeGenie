import {
  getRabbitMqChannel,
  MAIL_EXCHANGE,
} from "../config/rebbitMq.config.js";

export const sendOtpProducer = (data: any) => {
  const channel = getRabbitMqChannel();

  channel.publish(
    MAIL_EXCHANGE,
    "mail_Routing_Key",
    Buffer.from(JSON.stringify(data)),
  );
};
