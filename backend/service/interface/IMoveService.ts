import axios from "axios"
import { MovieResponseType, MovieType } from "../../types/types.js"

interface IMovieService{
    searchMovie(query: string,page:number):Promise<MovieResponseType | null>
    getFavorites():Promise<MovieType[] | null>
    addToFavorite(movie:MovieType):Promise<MovieType | null>
    removeFromFavorites(id:string):Promise<MovieType | null>
    
}

export default  IMovieService
