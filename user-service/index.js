import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes/routes.js'
import errorHandlerMiddleware from './middleware/error-handling.js'

dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (_, res) => res.send('Hello World from user-service'))
app.use(router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use(errorHandlerMiddleware)

app.listen(8000, () => console.log('user-service listening on port 8000'));

export default app