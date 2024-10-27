import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import SearchedMoviePage from './pages/SearchedMoviePage'; // Import SearchedMoviePage
import SearchPage from './pages/SearchPage';
import MovieDetailPage from './pages/MovieDetailPage';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
