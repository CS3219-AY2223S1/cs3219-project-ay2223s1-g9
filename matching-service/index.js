import express from "express";
import cors from "cors";
import matchRouter from "./routes/matchingServiceRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.use(matchRouter);

app.listen(8001, () => console.log("Matching service listening on port 8001"));
