import app from "./app.js";
import CONFIG from "./config/config.js";
import dbConnect from "./config/db.config.js";

const startServer = async () => {
  await dbConnect();
  app.listen(CONFIG.PORT, () => {
    console.log(`Auth Server is runing at ${CONFIG.PORT}`);
  });
};

startServer();
