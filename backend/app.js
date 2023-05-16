import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDb from './database/config.js'
import { router } from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'

const { BACKEND_PORT, FRONTEND_URL } = process.env
dotenv.config()

connectDb()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true
}))

//server setup
app.listen(BACKEND_PORT, () => {
    console.log("server started on port", BACKEND_PORT)
})

//routes
app.use('/', router)
