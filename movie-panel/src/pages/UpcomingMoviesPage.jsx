import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/movieSlice'; // Import the thunk for fetching upcoming movies
import { Link } from 'react-router-dom'; // Import Link for routing

const UpcomingMoviesPage = () => {
  const dispatch = useDispatch();
  const { upcomingMovies, loading, error } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUpcomingMovies(page)); // Fetch upcoming movies when page changes
  }, [dispatch, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div>
      <h1>Upcoming Movies</h1>
      <div className="movie-list">
        {upcomingMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item"> {/* Link to movie detail page */}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UpcomingMoviesPage;
