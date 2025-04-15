import { Request,Response } from "express"
import IMovieService from "../service/interface/IMoveService.js"
import { STATUS_CODE } from "../constance/statusCode.js"
import { ERROR_MESSAGE} from "../constance/errorMessage.js"
import { SUCESS_MESSAGE } from "../constance/sucessMessage.js"

class MovieController{

    private _movieService: IMovieService
    constructor(movieService: IMovieService){
        this._movieService = movieService
    }

    //search movie with query
    async searchMovie(req:Request, res:Response){
        const {query,page} = req.query
        if(!String(query).trim()){
            res.status(STATUS_CODE.INVALID_INPUT).json({status:false, message:ERROR_MESSAGE})
            return
        }
        try {
            const response = await this._movieService.searchMovie(query as string,Number(page))
            res.status(STATUS_CODE.OK).json({status: true, message:SUCESS_MESSAGE.FETCH_SUCESS, data: response ?? []})
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({status: false, message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR})
        }
    }

    // get all favorite movies

   async  getFavorites(req:Request, res:Response){
    
    try {
        const response =  await this._movieService.getFavorites()
        res.status(STATUS_CODE.OK).json({status: true, message:SUCESS_MESSAGE.FETCH_SUCESS, data:response})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({status: false, message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR})
    }
}

// add new movie to the list
async addToFavorites(req:Request, res:Response){
    const { movie } = req.body;
    try {
       const response =  await this._movieService.addToFavorite(movie)
        res.status(STATUS_CODE.OK).json({status: true, message:SUCESS_MESSAGE.INSERT_SUCESS, data: response})

    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({status: false, message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR})
        
    }

}


async removeFromFavorites(req:Request, res:Response){
    const { imdbID } = req.params
    try {
        const response = await this._movieService.removeFromFavorites(imdbID)
    res.status(STATUS_CODE.OK).json({status: true, message:SUCESS_MESSAGE.REMOVE_SUCESS, data: response ?? []})
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({status: false, message:ERROR_MESSAGE.INTERNAL_SERVER_ERROR})
    }
}


}

export default MovieController






