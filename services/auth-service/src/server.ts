import app from "./app.js";
import CONFIG from "./config/config.js";

app.listen(CONFIG.PORT, () => {
  console.log(`Auth Server is runing at ${CONFIG.PORT}`);
});
