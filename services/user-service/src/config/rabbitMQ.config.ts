import amqplib, { Channel } from "amqplib";

let channel: Channel;
const PROFILE_EXCHANGE = "profile_exchange";
export const PROFILE_QUEUE = "profile_queue";
const PROFILE_ROUTING_KEY = "profile_routing_key";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertExchange(PROFILE_EXCHANGE, "direct", {
      durable: true,
    });
    await channel.assertQueue(PROFILE_QUEUE, { durable: false });
    await channel.bindQueue(
      PROFILE_QUEUE,
      PROFILE_EXCHANGE,
      PROFILE_ROUTING_KEY,
    );
    console.log(" User Service Rabbit MQ connection established successfully");
  } catch (error) {
    console.log(" Mail service Rabbit MQ connection error", error);
  }
};

export const getRabbitMqChannel = () => {
  if (!channel) {
    throw new Error("Auth Service RabbitMQ channel not found");
  }
  return channel;
};
