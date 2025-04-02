import { Router } from "express";
import { addToFavorites, getFavorites, searchMovie } from "../controller/movieController.js";

const router = Router()

router.get('/search', searchMovie)
router.get('/favorites', getFavorites)
router.post('/favorites', addToFavorites)

export default router
