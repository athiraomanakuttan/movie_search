import { Request,response,Response } from "express"
import axios from 'axios'
import { readFavorites, writeFavorites } from "../utils/favUtils.js"
import { MovieType } from "../types/types.js"
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

// get all favorite movies

export const getFavorites = async (req:Request, res:Response)=>{
    try {
        const response = readFavorites()
        res.status(200).json({status: true, message:"data fetched sucessfully", data:response})
    } catch (error) {
        res.status(500).json({status: false, message:"internal server error"})
    }
}

// add new movie to the list
export const addToFavorites = (req:Request, res:Response)=>{
    const { movie } = req.body;
    try {
        let favorites = readFavorites();

    if (!favorites.find((fav:MovieType) => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        writeFavorites(favorites);
    }
        res.status(200).json({status: true, message:"Movie added to favorite", data: favorites})

    } catch (error) {
        res.status(500).json({status: false, message:"internal server error"})
        
    }

}

export const removeFromFavorites = (req:Request, res:Response)=>{
    const { id } = req.params
    try {
        let favorites = readFavorites();
    favorites = favorites.filter((fav:MovieType) => fav.imdbID !== id);
    writeFavorites(favorites);
    res.status(200).json({status: true, message:"movie removed from favorites", data: favorites})
    } catch (error) {
        res.status(500).json({status: false, message:"internal server error"})
        
    }
}