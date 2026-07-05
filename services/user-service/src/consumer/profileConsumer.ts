import {
  getRabbitMqChannel,
  PROFILE_QUEUE,
} from "../config/rabbitMQ.config.js";
import { createProfileService } from "../services/profileService.js";

export const profileConsumer = () => {
  const channel = getRabbitMqChannel();

  channel.consume(PROFILE_QUEUE, async (message) => {
    if (message !== null) {
      try {
        await createProfileService(JSON.parse(message.content.toString()));
        channel.ack(message);
      } catch (error) {
        channel.nack(message);
      }
    }
  });
};
