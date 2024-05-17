import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDI1MDQ1NmQ5OWYzZjBjNmRiZDU0MTI3YzdhNDY5OCIsInN1YiI6IjY2MWEzNzQzNWZmMzRlMDE3YzU5NDU4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iQKZqEhDKzZq3ZjW1XUrJrauWqxsmMsymT8XOaN7tfA';
const BASE_URL = 'https://api.themoviedb.org/3';
const HEADERS = { Authorization: `Bearer ${API_KEY}` };

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: HEADERS,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  const data = await fetchFromAPI('trending/movie/day');
  return data ? data.results : [];
};

export const searchMovies = async (query) => {
  const data = await fetchFromAPI('search/movie', { query });
  return data ? data.results : [];
};

export const fetchMovieDetails = async (movieId) => {
  const data = await fetchFromAPI(`movie/${movieId}`);
  return data || null;
};

export const fetchMovieCast = async (movieId) => {
  const data = await fetchFromAPI(`movie/${movieId}/credits`);
  return data ? data.cast : [];
};

export const fetchMovieReviews = async (movieId) => {
  const data = await fetchFromAPI(`movie/${movieId}/reviews`);
  return data ? data.results : [];
};
