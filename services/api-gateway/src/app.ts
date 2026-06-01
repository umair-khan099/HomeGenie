import express from "express";
import proxy from "express-http-proxy"
export const app = express();

app.use("/api/v1/auth" , proxy("http://localhost:3001"))

