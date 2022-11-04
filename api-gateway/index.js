import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import UserServiceRouter from "./routes/user-service-route.js";
import HistoryServiceRouter from "./routes/history-service-route.js"
import CollabServiceRouter from "./routes/collaboration-service-route.js"

import { initiateSocket } from "./routes/socket-event-route.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get('/', (_, res) => res.send('Hello World from api-gateway'))
app.use(UserServiceRouter)
app.use(HistoryServiceRouter)
app.use(CollabServiceRouter)
app.use(express.json())

const httpServer = initiateSocket(app);

httpServer.listen(8010, () =>
  console.log("api-gateway listening on port 8010")
);

export default app
