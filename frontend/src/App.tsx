import { useState, useEffect } from "react";
import { getFavoriteList, searchMovie } from "./service/apiCall"; 
import "./App.css";
import { MovieType } from "./type/type";
import MovieCard from "./component/MovieCard";
import { Heart } from 'lucide-react';

function App() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [favMovie, setFavMovie] = useState<MovieType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [totalResults, setTotalResults] = useState<number>(0);  
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [currentFavPage, setCurrentFavPage] = useState<number>(1);
  const moviesPerPage = 10;
  const favMoviesPerPage = 10;  

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);  
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getFavMovieList();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      const fetchMovies = async () => {
        const response = await searchMovie(debouncedSearch, currentPage);  
        console.log("response", response);
        
        if (response?.data?.Response === "False") {
          setMovies([]);
          setTotalResults(0);  
          return;
        }

        if (response?.data?.Search) {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults, 10) || 0);
        }
      };
      fetchMovies();
    }
  }, [debouncedSearch, currentPage]);  

  const totalPages = Math.ceil(totalResults / moviesPerPage);
  const totalFavPages = Math.ceil(favMovie.length / favMoviesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousFavPage = () => {
    if (currentFavPage > 1) {
      setCurrentFavPage(currentFavPage - 1);
    }
  };

  const handleNextFavPage = () => {
    if (currentFavPage < totalFavPages) {
      setCurrentFavPage(currentFavPage + 1);
    }
  };

  const getFavMovieList = async () => {
    const response = await getFavoriteList();
    setFavMovie(response.data ?? []);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Get current favorite movies for pagination
  const indexOfLastFavMovie = currentFavPage * favMoviesPerPage;
  const indexOfFirstFavMovie = indexOfLastFavMovie - favMoviesPerPage;
  const currentFavMovies = favMovie.slice(indexOfFirstFavMovie, indexOfLastFavMovie);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 relative">
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <button 
          onClick={toggleFavorites}
          className="relative p-2 bg-violet-500 rounded-full hover:bg-violet-400 transition-colors"
          aria-label="Toggle favorites"
        >
          <Heart className="text-white" fill="white" size={24} />
          {favMovie.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {favMovie.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Movie name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 text-lg border border-gray-300 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={() => {
              setDebouncedSearch(search);
              setCurrentPage(1);  
            }}
            className="px-4 py-2 text-lg bg-violet-500 text-white rounded-2xl hover:bg-violet-400 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {showFavorites || (!debouncedSearch && favMovie.length > 0) ? (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Favorite Movies</h2>
          {favMovie.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {currentFavMovies.map((movie) => (
                  <MovieCard 
                    key={movie.imdbID} 
                    movie={movie}
                    favMovie={favMovie}
                    setFavMovie={setFavMovie}
                  />
                ))}
              </div>
              
              {totalFavPages > 1 && (
                <div className="flex flex-wrap justify-center mt-8 space-x-2 md:space-x-4">
                  <button
                    onClick={handlePreviousFavPage}
                    disabled={currentFavPage === 1}
                    className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg rounded-2xl ${
                      currentFavPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-violet-500 text-white hover:bg-violet-400"
                    } transition-colors`}
                  >
                    Previous
                  </button>
                  <span className="text-sm md:text-lg text-gray-600 flex items-center">
                    Page {currentFavPage} of {totalFavPages}
                  </span>
                  <button
                    onClick={handleNextFavPage}
                    disabled={currentFavPage === totalFavPages}
                    className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg rounded-2xl ${
                      currentFavPage === totalFavPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-violet-500 text-white hover:bg-violet-400"
                    } transition-colors`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600 text-xl mt-12">
              No favorite movies yet
            </div>
          )}
        </div>
      ) : debouncedSearch && movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie}
                favMovie={favMovie}
                setFavMovie={setFavMovie}
              />
            ))}
          </div>
 
          <div className="flex flex-wrap justify-center mt-8 space-x-2 md:space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg rounded-2xl ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-violet-500 text-white hover:bg-violet-400"
              } transition-colors`}
            >
              Previous
            </button>
            <span className="text-sm md:text-lg text-gray-600 flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg rounded-2xl ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-violet-500 text-white hover:bg-violet-400"
              } transition-colors`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 text-xl mt-12">
          {debouncedSearch ? "No movies found" : "Search for movies or view your favorites"}
        </div>
      )}
    </div>
  );
}

export default App;