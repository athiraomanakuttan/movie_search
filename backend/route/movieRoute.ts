import { Router } from "express";
import MovieService from "../service/movieService.js";
import MovieController from "../controller/movieController.js";

const movieService = new MovieService()
const movieController = new  MovieController(movieService)


const router = Router()

router.get('/search', (req,res)=>movieController.searchMovie(req,res))
router.get('/favorites',  (req,res)=>movieController.getFavorites(req,res))
router.post('/favorites',  (req,res)=>movieController.addToFavorites(req,res))
router.put('/favorites/:id',  (req,res)=>movieController.removeFromFavorites(req,res))

export default router
