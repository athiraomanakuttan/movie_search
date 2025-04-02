import { Request,Response } from "express"
import axios from 'axios'
export const searchMovie = async (req:Request, res:Response)=>{
    const {query,page} = req.query
    const apikey = process.env.OMDB_API_KEY
    if(!String(query).trim()){
        res.status(403).json({status:false, message:"invalid input"})
        return
    }
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${page}`)
        res.status(200).json({status: true, message:"data fetched successfull", data: response.data ?? []})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: false, message:"Internal server error"})
    }
}