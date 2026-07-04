import app from "./app.js";
import dbConnect from "./config/db.config.js";
import { User } from "./models/user.model.js";

dbConnect();

app.listen(3002, () => {
  console.log("User service is running at port :: 3002");
});
