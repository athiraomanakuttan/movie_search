import express from 'express'
import movieRouter from './route/movieRoute.js'
import cors from 'cors'
import { ORIGIN_URL, PORT } from './config/envConfig.js'


const app = express()
app.use(express.json())
app.use(cors({
    origin: ORIGIN_URL || 'http://localhost:5173',
}))

app.use('/api/movies', movieRouter)
app.listen(PORT , ()=> console.log(`server running http://localhost:${PORT}`))