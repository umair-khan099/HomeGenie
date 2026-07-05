import { getRabbitMqChannel, PROFILE_QUEUE } from "../config/rabbitMQ.config.js";
import { createProfileService } from "../services/profileService.js";


export const profileConsumer = () => {
  console.log("Profile consumer started");

  const channel = getRabbitMqChannel();

  channel.consume(PROFILE_QUEUE, async (message) => {
    console.log("Message received");

    if (message) {
      console.log(message.content.toString());

      try {
        await createProfileService(JSON.parse(message.content.toString()));

        console.log("Profile created");

        channel.ack(message);
      } catch (err) {
        console.log(err);

        channel.nack(message);
      }
    }
  });
};
