import { app } from "./app.js";
import { CONFIG } from "./config/dotenv.config.js";
const startServer = () => {
    app.listen(CONFIG.PORT, () => {
        console.log(`GateWay servise is successfully runing at port :: ${CONFIG.PORT}`);
    });
};
startServer();
