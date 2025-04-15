import axios from "axios";
import IMovieService from "./interface/IMoveService.js";
import { MovieResponseType, MovieType } from "../types/types.js";
import { readFavorites, writeFavorites } from "../utils/favUtils.js";
import { API_KEY, OMDB_URI } from "../config/envConfig.js";

class MovieService implements IMovieService {
  // get movie from external API
  async searchMovie(
    query: string,
    page: number
  ): Promise<MovieResponseType | null> {
    
    try {
      const response = await axios.get(
        `${OMDB_URI}?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  // get all favorite movies
  async getFavorites(): Promise<MovieType[] | null> {
    try {
      const response = readFavorites();
      return response;
    } catch (error) {
      return null;
    }
  }

  // add a new movie to the favorite list

  async addToFavorite(movie: MovieType): Promise<MovieType | null> {
    try {
      let favorites = readFavorites();

      if (!favorites.find((fav: MovieType) => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        writeFavorites(favorites);
      }
      return favorites;
    } catch (error) {
      return null;
    }
  }

  // remove a movie from favorite list

  async removeFromFavorites(imdbID: string): Promise<MovieType | null> {
    try {
      let favorites = readFavorites();
      favorites = favorites.filter((fav: MovieType) => fav.imdbID !== imdbID);
      writeFavorites(favorites);
      return favorites;
    } catch (error) {
      return null;
    }
  }
}

export default MovieService;
