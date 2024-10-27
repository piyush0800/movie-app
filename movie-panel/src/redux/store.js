import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'; // Adjust the path if needed

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export { store }; // Export store as a named export
