import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

import errorHandlerMiddleware from './middleware/error-handling.js'

app.get('/', (_, res) => res.send('Hello World from history-service'))

app.use(errorHandlerMiddleware)

app.listen(8005, () => console.log('history-service listening on port 8005'));