import { Router } from "express";
import { searchMovie } from "../controller/movieController.js";

const router = Router()

router.get('/search', searchMovie)

export default router
