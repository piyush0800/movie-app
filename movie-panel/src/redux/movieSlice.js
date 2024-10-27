import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

// Thunks to fetch movies
export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchSearchedMovies = createAsyncThunk(
  'movies/fetchSearched',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

// New thunk to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

// New thunk to fetch movie cast
export const fetchMovieCast = createAsyncThunk(
  'movies/fetchMovieCast',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
      return response.data.cast; // Return only the cast array
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    searchedMovies: [],
    movieDetails: {}, // Initialize movieDetails as an object
    cast: [], // Initialize cast as an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, action, key) => {
      state.loading = false;
      state[key] = action.payload.results || action.payload; // Handle results or payload directly
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch data";
    };

    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, handlePending)
      .addCase(fetchPopularMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'popularMovies'))
      .addCase(fetchPopularMovies.rejected, handleRejected)

      // Top-Rated Movies
      .addCase(fetchTopRatedMovies.pending, handlePending)
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'topRatedMovies'))
      .addCase(fetchTopRatedMovies.rejected, handleRejected)

      // Upcoming Movies
      .addCase(fetchUpcomingMovies.pending, handlePending)
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'upcomingMovies'))
      .addCase(fetchUpcomingMovies.rejected, handleRejected)

      // Searched Movies
      .addCase(fetchSearchedMovies.pending, handlePending)
      .addCase(fetchSearchedMovies.fulfilled, (state, action) => handleFulfilled(state, action, 'searchedMovies'))
      .addCase(fetchSearchedMovies.rejected, handleRejected)

      // Movie Details
      .addCase(fetchMovieDetails.pending, handlePending)
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload; // Store the movie details directly
      })
      .addCase(fetchMovieDetails.rejected, handleRejected)

      // Movie Cast
      .addCase(fetchMovieCast.pending, handlePending)
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.loading = false;
        state.cast = action.payload; // Store the cast information
      })
      .addCase(fetchMovieCast.rejected, handleRejected);
  },
});

// Selectors
export const selectAllPopularMovies = (state) => state.movies.popularMovies;
export const selectAllTopRatedMovies = (state) => state.movies.topRatedMovies;
export const selectAllUpcomingMovies = (state) => state.movies.upcomingMovies;
export const selectAllSearchedMovies = (state) => state.movies.searchedMovies; 
export const selectMovieDetails = (state) => state.movies.movieDetails; 
export const selectMovieCast = (state) => state.movies.cast; // Selector for movie cast
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;

export default movieSlice.reducer;
