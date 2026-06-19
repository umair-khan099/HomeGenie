import ampqblipn, { Channel } from "amqplib";

let channel: Channel;
export const MAIL_EXCHANGE = "mail_exchange";

export const connectRabbitMQ = async () => {
  try {
    const connection = await ampqblipn.connect("http://localhost");
    channel = await connection.createChannel();

    await channel.assertExchange(MAIL_EXCHANGE, "direct", { durable: false });
    console.log(" Auth Service Rabbit MQ connection established successfully");
  } catch (error) {
    console.log(" Auth service Rabbit MQ connection error", error);
  }
};

export const getRabbitMqChannel = () => {
  if (!channel) {
    throw new Error("Auth Service RabbitMQ channel not found");
  }
  return channel;
};
