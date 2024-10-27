import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, selectAllPopularMovies, selectLoading, selectError } from '../redux/movieSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(selectAllPopularMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="movie-list">
        {popularMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item"> {/* Link to movie detail page */}
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
        </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
