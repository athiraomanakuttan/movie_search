import { Router } from "express";
import MovieService from "../service/movieService.js";
import MovieController from "../controller/movieController.js";

const movieService = new MovieService()
const movieController = new  MovieController(movieService)


const router = Router()

router.get('/search', movieController.searchMovie)
router.get('/favorites', movieController.getFavorites)
router.post('/favorites', movieController.addToFavorites)
router.put('/favorites/:id', movieController.removeFromFavorites)

export default router
