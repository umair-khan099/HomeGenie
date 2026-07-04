import express from "express";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import { isAuth } from "./middlewares/isAuth.js";

// app
const app = express();

//middleware

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// public Routes

const authProxy = proxy("http://localhost:3001", {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace("/api/v1/auth", "");
  },

  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    if (srcReq.user) {
      proxyReqOpts.headers["user_id"] = JSON.stringify(srcReq.user);
    }
    return proxyReqOpts;
  },
});

// public Route
// auth Route
app.use("/api/v1/auth/send-mail", authProxy);
app.use("/api/v1/auth/sign-up", authProxy);
app.use("/api/v1/auth/login", authProxy);
app.use("/api/v1/auth/forget-password", authProxy);
app.use("/api/v1/auth/forget-password-otp-verify", authProxy);
app.use("/api/v1/auth/reset-password", authProxy);
app.use("/api/v1/auth/rotate-token", authProxy);

//private Route
//auth Route
app.use("/api/v1/auth/update-password", isAuth, authProxy);
app.use("/api/v1/user", proxy("http://localhost:3002"));
export default app;
