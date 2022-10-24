import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import user_service_router from "./routes/user-service-route.js";
import { initiateSocket } from "./routes/socket-event-route.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.use(user_service_router);
const httpServer = initiateSocket(app);

httpServer.listen(8010, () =>
  console.log("api-gateway listening on port 8010")
);
