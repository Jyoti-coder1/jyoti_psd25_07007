import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function MovieDetail() {
    const { id } = useParams();
    const apiKey = useContext(MovieContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=38bd14df&i=tt3896198&plot=full`)
        .then((res) => res.json())
        then((data) => {
            if (data.Response === "True") {
                setMovie(data);
                setError("");
            }
            else {
                setError("Movie details not found!");
            }
            setLoading(false);
        })
        .catch(() => {
            setError("Error fetching details");
            setLoading(false);
        });
    }, [id, apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        movie && (
            <div>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.Title} />
                <p><b>Year:</b> {movie.Year}</p>
                <p><b>Genre:</b> {movie.Genre}</p>
                <p><b>Plot:</b> {movie.Plot}</p>
            </div>
        )
    );
}

export default MovieDetail;