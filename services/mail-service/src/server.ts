import { app } from "./app.js";
import { CONFIG } from "./config/dotenv.config.js";

app.listen(CONFIG.PORT, () => {
  console.log(`mail-server is runing at PORT : ${CONFIG.PORT}`);
});
