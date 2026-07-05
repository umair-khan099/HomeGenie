// import { any } from "zod";
import {
  getRabbitMqChannel,
  PROFILE_EXCHANGE,
} from "../config/rebbitMq.config.js";

export const createProfileProducer = (data: any) => {
  const channel = getRabbitMqChannel();

  channel.publish(
    PROFILE_EXCHANGE,
    "profile_routing_key",
    Buffer.from(JSON.stringify(data)),
  );
};
