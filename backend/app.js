import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDb from './database/config.js'
import { router } from './routes/userRoutes.js'

connectDb()
dotenv.config()
const { BACKEND_PORT, FRONTEND_URL } = process.env

const app = express()

app.use(morgan('dev'))

//server setup
app.listen(BACKEND_PORT, () => {
    console.log("server started on port", BACKEND_PORT)
})

app.use(express.json())

app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true
}))

app.get('/', (req, res) => {
    console.log("foooooooooooooooooooo")
    res.send("working")
})

app.use('/', router)
