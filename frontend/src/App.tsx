import { useState, useEffect } from "react";
import { searchMovie } from "./service/apiCall"; 
import "./App.css";
import { MovieType } from "./type/type";
import MovieCard from "./component/MovieCard";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 
    return () => clearTimeout(timer);  
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      const fetchMovies = async () => {
        const response = await searchMovie(debouncedSearch);
        if(response.data.Response && response.data.Response==='False'){
          setMovies([])
        return  }
        if (response?.data?.Search) setMovies(response?.data?.Search);
      };
      fetchMovies();
    }
  }, [debouncedSearch]);

  return (
    <>
     <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Movie name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 text-lg border border-gray-300 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={() => setDebouncedSearch(search)}
            className="px-4 py-2 text-lg bg-violet-500 text-white rounded-2xl hover:bg-violet-400 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl mt-12">
          No movies found
        </div>
      )}
    </div>
    </>
  );
}

export default App;
