import { app } from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`mail-server is runing at PORT :: ${process.env.PORT}`);
});
