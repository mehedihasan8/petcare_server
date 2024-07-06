import { Server } from "http";
import { app } from "./app";
const port = process.env.PORT || 3000;

const main = async () => {
  const server: Server = app.listen(port, () => {
    console.log(`App runnige on port ${port}`);
  });
};

main();
