import { useState, useEffect } from 'react';
import { searchMovies } from '../../api/movie';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const queryParam = searchParams.get('query');
                const results = await searchMovies(queryParam);
                if (results.length === 0) {
                    setError("No movies found for the given query.");
                } else {
                    setMovies(results);
                    setError(null);
                }
            } catch (error) {
                console.error('Error searching movies:', error);
                setError("An error occurred while searching for movies.");
            }
        };

        if (searchParams.has('query')) {
            fetchMovies();
        }
    }, [searchParams]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = e.target.elements.query.value;
        setSearchParams({ query });
    };

    return (
        <div>
            <h2>Search Movies</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    name="query"
                    defaultValue={searchParams.get('query') || ''}
                    placeholder="Search for a movie..."
                />
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}

            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;