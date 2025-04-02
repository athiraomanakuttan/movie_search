import { Heart } from 'lucide-react';
import { MovieType } from "../type/type";

interface ParamsType {
  movie: MovieType;
  
}

const MovieCard = ({ movie}: ParamsType) => {
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
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          <Heart 
            
          />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;