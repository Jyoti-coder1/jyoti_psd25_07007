import { useSelector } from "react-redux";
import { SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
    const watchlist = useSelector((state) => state.watchlist);

    return (
        <SimpleGrid columns={[2, 3, 4]} spacing={4} p={4}>
            {watchlist.length === 0 ? <Text>No movies in watchlist</Text> :
                watchlist.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </SimpleGrid>
    );
};
export default Watchlist;