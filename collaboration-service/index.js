import express from "express";
import cors from "cors";
import collabRouter from "./routes/collaboration-service-router.js";
import errorHandlerMiddleware from './middleware/error-handling.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.use(collabRouter).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use(errorHandlerMiddleware)

app.listen(8003, () =>
  console.log("collaboration service listening on port 8003")
);
