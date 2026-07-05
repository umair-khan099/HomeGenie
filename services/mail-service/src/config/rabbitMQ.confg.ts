import amqplib, { Channel } from "amqplib"; 

let channel: Channel;
const MAIL_EXCHANGE = "mail_exchange";
export const MAIL_QUEUE = "mail_queue";
const MAIL_ROUTE_KEY = "mail_Routing_Key";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertExchange(MAIL_EXCHANGE, "direct", { durable: false });
    await channel.assertQueue(MAIL_QUEUE, { durable: false });
    await channel.bindQueue(MAIL_QUEUE, MAIL_EXCHANGE, MAIL_ROUTE_KEY);
    console.log(" Mail Service Rabbit MQ connection established successfully");
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
