import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";

function Search() {
    const apiKey = useContext(MovieContext);
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            fetch(`https://www.omdbapi.com/?apikey=38bd14df&s=avengers`)
            .then((res) => res.json())
            .then((data) => {
                if (data.Response === "True") {
                    setMovies(data.Search);
                    setError("");
                }
                else {
                    setError("Movie not found!");
                    setMovies([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching data");
                setLoading(false);
            });
        }
    }, [query, apiKey]);

    return (
        <div>
            <input type="text" placeholder="Search movie..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            {movie.Title} ({movie.Year})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;