import { Heart } from 'lucide-react';
import { MovieType } from "../type/type";
import { addToFavorite, removeFromFavorite } from "../service/apiCall";
import { toast } from "react-toastify";

interface ParamsType {
  movie: MovieType;
  favMovie: MovieType[];
  setFavMovie: React.Dispatch<React.SetStateAction<MovieType[]>>;
}

const MovieCard = ({ movie, favMovie, setFavMovie }: ParamsType) => {
  const isFavorite = favMovie.some(fav => fav.imdbID === movie.imdbID);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      if (isFavorite) {
        await removeFromFavorite(movie.imdbID);
        setFavMovie(prev => prev.filter(fav => fav.imdbID !== movie.imdbID));
        toast.success(`${movie.Title} removed from favorites`);
      } else {
        await addToFavorite(movie);
        setFavMovie(prev => [...prev, movie]);
        toast.success(`${movie.Title} added to favorites`);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="relative w-full cursor-pointer transition-transform duration-300 hover:scale-105 group">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img 
          src={movie.Poster} 
          alt={`${movie.Title} poster`}
          className="w-full h-[300px] object-cover block"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2.5 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="m-0 text-base font-bold truncate">{movie.Title}</h3>
          <p className="mt-1 text-sm text-gray-300">{movie.Year}</p>
        </div>
        
        <button 
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          <Heart 
            className={isFavorite ? "text-red-500" : "text-white"}
            fill={isFavorite ? "red" : "none"}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;