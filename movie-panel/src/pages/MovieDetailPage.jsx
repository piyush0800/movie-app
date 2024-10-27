import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast } from '../redux/movieSlice';
// import './MovieDetailPage.css'; // Import CSS file for styling

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, cast, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
      dispatch(fetchMovieCast(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message || error}</div>;
  }

  if (!movieDetails || Object.keys(movieDetails).length === 0) {
    return <div>No movie details available.</div>;
  }

  return (
    <div className="movie-detail-page">
      <div className="movie-card">
        <div className="movie-card-left">
          <div className="movie-poster-container">
            {movieDetails.poster_path ? (
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            ) : (
              <div className="no-poster">No poster available</div>
            )}
          </div>
          <div className="movie-info">
            <h1>{movieDetails.title}</h1>
            <p><strong>Rating:</strong> {movieDetails.vote_average || "N/A"}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date || "N/A"}</p>
            <p><strong>Runtime:</strong> {movieDetails.runtime ? `${movieDetails.runtime} minutes` : "N/A"}</p>
            <p>
              <strong>Genres:</strong> 
              {movieDetails.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
            </p>
            <p><strong>Overview:</strong> {movieDetails.overview || "N/A"}</p>
          </div>
        </div>
        <div className="movie-card-right">
          {movieDetails.backdrop_path ? (
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
              alt={`${movieDetails.title} backdrop`}
            />
          ) : (
            <div className="no-backdrop">No additional poster available</div>
          )}
        </div>
      </div>

      <h2>Cast</h2>
      <div className="cast-list">
        {cast.map((actor) => (
          <div key={actor.id} className="cast-member-card">
            {actor.profile_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} 
                alt={actor.name} 
                className="actor-image" 
              />
            ) : (
              <div className="no-profile">No image available</div>
            )}
            <p><strong>{actor.name}</strong> as {actor.character || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
