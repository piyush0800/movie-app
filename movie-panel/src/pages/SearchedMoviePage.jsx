import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchedMovies, selectAllSearchedMovies, selectLoading, selectError } from '../redux/movieSlice';
import { Link } from 'react-router-dom';

const SearchedMoviePage = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const searchedMovies = useSelector(selectAllSearchedMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchedMovies(searchTerm));
    }
  }, [dispatch, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Search Results for: {searchTerm}</h1>
      <div className="movie-list">
        {searchedMovies && searchedMovies.length > 0 ? (
          searchedMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item"> {/* Link to movie detail page */}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </Link>
          ))
        ) : (
          <p>No results found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchedMoviePage;
