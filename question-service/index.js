import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

import questionRoutes from './routes/question-routes.js'
import errorHandlerMiddleware from './middleware/error-handling.js'

app.get('/', (_, res) => res.send('Hello World from question-service'))
app.use('/', questionRoutes).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})
app.use(errorHandlerMiddleware)

app.listen(8002, () => console.log('question-service listening on port 8002'));

export default app