import { useState, useEffect } from 'react';
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from '../../api/movie';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await fetchTrendingMovies();
                setMovies(movies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
                setError("An error occurred while fetching trending movies.");
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Trending Movies</h2>
            <MovieList movies={movies} />
        </div>
    );
}

export default HomePage;