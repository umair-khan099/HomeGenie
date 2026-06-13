import { createClient, RedisClientType } from "redis";
import CONFIG from "./config.js";
let client: RedisClientType;

export const connectRedis = async () => {
  client = createClient({
    username: "default",
    password: CONFIG.REDIS_PASS,
    socket: {
      host: CONFIG.REDIS_HOST,
      port: Number(CONFIG.REDIS_PORT),
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  console.log("Auth Service redis db  connected ");
};

export const getRedisClient = () => {
  if (!client) {
    throw new Error("Redis Client not initialized");
  }
  return client;
};
