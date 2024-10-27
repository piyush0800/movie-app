import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchedMovies } from '../redux/movieSlice'; // Import the thunk for fetching searched movies
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const { searchTerm } = useParams(); // Get the search term from the URL
  const dispatch = useDispatch();
  const { searchedMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchedMovies(searchTerm)); // Fetch searched movies on component mount
    }
  }, [dispatch, searchTerm]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  return (
    <div>
      <h1>Search Results for: "{searchTerm}"</h1>
      <div className="movie-list">
        {searchedMovies.length > 0 ? (
          searchedMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item"> {/* Link to movie detail page */}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </Link>
          ))
        ) : (
          <p>No results found for "{searchTerm}".</p> // Message when no movies are found
        )}
      </div>
    </div>
  );
};

export default SearchPage;
