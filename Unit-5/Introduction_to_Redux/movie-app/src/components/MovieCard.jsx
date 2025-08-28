import { Box, Image, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../redux/watchlistSlice";

const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();

    return (
        <Box border="1px solid gray" borderRadius="md" p={2}>
            <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <Button colorScheme="teal" size="sm" onClick={() => dispatch(addToWatchlist(movie))}>
                Add to Watchlist
            </Button>
        </Box>
    );
};
export default MovieCard;