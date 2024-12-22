// import axios from "axios";
import { API_KEY } from "../constants";
import TrendingMovies from "../components/trendingMovies";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org";
const TRENDING_MOVIES = `${BASE_URL}/3/trending/movie/day?language=en-US`;
const UPCOMING_MOVIES = `${BASE_URL}/3/movie/upcoming?language=en-US&page=1`;
const TOP_RATED_MOVIES = `${BASE_URL}/3/movie/top_rated?language=en-US&page=1`;

const movieDetails = (movieId) =>
  `${BASE_URL}/3/movie/${movieId}?language=en-US`;

const movieCredits = (movieId) =>
  `${BASE_URL}/3/movie/${movieId}/credits?language=en-US`;

const similarMovies = (movieId) =>
  `${BASE_URL}/3/movie/${movieId}/similar?language=en-US&page=1`;

const searchMoviesEndpoint = `${BASE_URL}/3/search/movie`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ?? {},
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(TRENDING_MOVIES);
};
export const fetchUpcomingMovies = () => {
  return apiCall(UPCOMING_MOVIES);
};
export const fetchTopRatedMovies = () => {
  return apiCall(TOP_RATED_MOVIES);
};
export const fetchMovieDetails = (movieId) => {
  return apiCall(movieDetails(movieId));
};
export const fetchMovieCredits = (movieId) => {
  return apiCall(movieCredits(movieId));
};
export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMovies(movieId));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
