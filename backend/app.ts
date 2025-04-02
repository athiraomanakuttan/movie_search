import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import movieRouter from './route/movieRoute.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.ORIGIN_URL || 'http://localhost:5173',
}))

app.use('/api/movies', movieRouter)
console.log("process.env.PORT",process.env.PORT)
app.listen(process.env.PORT , ()=> console.log(`server running http://localhost:${process.env.PORT}`))