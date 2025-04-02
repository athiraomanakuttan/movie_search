import { Router } from "express";
import { addToFavorites, getFavorites, removeFromFavorites, searchMovie } from "../controller/movieController.js";

const router = Router()

router.get('/search', searchMovie)
router.get('/favorites', getFavorites)
router.post('/favorites', addToFavorites)
router.put('/favorites/:id', removeFromFavorites)

export default router
