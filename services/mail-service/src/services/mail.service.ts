import { transporter } from "../config/email.config.js";
import { IMailData } from "../types/email.type.js";

export const sendMailService = async (data: IMailData) => {
  let info = await transporter.sendMail({
    from: data.from,
    to: data.email,
    subject: data.subject,
    html: data.body,
  });
  return info;
};
