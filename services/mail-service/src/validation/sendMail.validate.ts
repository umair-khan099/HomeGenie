import {z} from "zod";

export const sendMailSchema = z.object({
  email: z.string().trim().email(),
  subject: z.string().trim().min(1),
  body: z.string().trim().min(1),   
  from: z.string().trim().min(1),
});
