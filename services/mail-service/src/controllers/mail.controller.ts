import express, { Request, Response } from "express";

interface IMailData {
  email: String;
  subject: string;
  body: string;
  from: string;
}

const sendMail = async (req: Request, res: Response) => {
  try {
    // fetch data
    const { email, subject, body, from } = req.body;

  } catch (error) {}
};
