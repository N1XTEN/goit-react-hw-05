import axios from 'axios';

const API_KEY = 'your_api_key_here';  // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromAPI = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: { Authorization: `Bearer ${API_KEY}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
};

export const fetchMovieCredits = (movieId) => fetchFromAPI(`movie/${movieId}/credits`).then(data => data.cast);

export const fetchMovieReviews = (movieId) => fetchFromAPI(`movie/${movieId}/reviews`).then(data => data.results);
