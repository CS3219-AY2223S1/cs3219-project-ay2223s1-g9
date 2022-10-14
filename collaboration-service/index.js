import express from "express";
import cors from "cors";
import collabRouter from "./routes/collaboration-service-router.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.use(collabRouter);

app.listen(8003, () =>
  console.log("Collaboration service listening on port 8003")
);
