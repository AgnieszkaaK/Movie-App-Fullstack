import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getTopRated, getGenres, getTrendingMoviesWeek, getPopularMovies, getLanguages } from '../tmdb-api'; 

const router = express.Router();

// movie routes to be added
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcomingMovies();
  res.status(200).json(upcomingMovies);
}));


router.get('/top-rated', asyncHandler(async (req, res) => {
  const topRated = await getTopRated();
  res.status(200).json(topRated);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genresOfMovies = await getGenres();
  res.status(200).json(genresOfMovies);
}));

router.get('/trendingweek', asyncHandler(async (req, res) => {
  const trendingThisWeek = await getTrendingMoviesWeek();
  res.status(200).json(trendingThisWeek);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const popularMovies = await getPopularMovies();
  res.status(200).json(popularMovies);
}));

router.get('/languages', asyncHandler(async (req, res) => {
  const movieLanguages = await getLanguages();
  res.status(200).json(movieLanguages);
}));

export default router;
