import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../../api/movie";
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
   const backLinkRef = useRef(location.state?.from || '/');
    
    console.log(backLinkRef)

    useEffect(() => {
        const detailsMovie = async () => {
            const details = await fetchMovieDetails(movieId);
            setMovie(details);
        };
        detailsMovie();
    }, [movieId]); 

    const formatScore = (score) => {
        return `${score}%`;
    };

    console.log(location)

    return (
        <div >
            <NavLink to={backLinkRef.current} >Go back</NavLink>
            {movie && (
                <div >
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width='250'/>
                    <div >
                        <h2 >{movie.title}</h2>
                        <p >User Score: {formatScore(movie.vote_average)}</p>
                        <p >{movie.overview}</p>
                        <p ><span>Genres</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                </div>
            )}
             
            {movie && (
                <div>
                    <h4>Additional information</h4>
                    <ul>
                        <li>
                            <NavLink to={`/movies/${movieId}/cast`}>Movie Cast</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/movies/${movieId}/reviews`}>Movie Reviews</NavLink>
                        </li>
                    </ul>
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default MovieDetails;