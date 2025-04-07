import React from 'react';
import { X, Heart } from 'lucide-react';
import { MovieType } from '../type/type';

interface ModalProps {
  movie: MovieType;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;  // Changed to not require the event parameter
}

const MovieModal: React.FC<ModalProps> = ({
  movie,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}
              alt={movie.Title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{movie.Title}</h2>
              <button
                onClick={onToggleFavorite}  // No longer passes an event
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={isFavorite ? 'text-red-500' : 'text-gray-400'}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  size={24}
                />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-semibold">Year:</span> {movie.Year}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Type:</span> {movie.Type}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">IMDB ID:</span> {movie.imdbID}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;