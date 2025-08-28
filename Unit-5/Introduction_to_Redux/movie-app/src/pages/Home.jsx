import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setPage } from "../redux/moviesSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";

const Home = () => {
    const dispatch = useDispatch();
    const { data, loading, error, page } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies(page));
    }, [dispatch, page]);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error: {error}</Text>;

    return (
        <>
            <SimpleGrid columns={[2, 3, 4]} spacing={4} p={4}>
                {data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </SimpleGrid>
            <Pagination currentPage={page} onPageChange={(p) => dispatch(setPage(p))} />
        </>
    );
};
export default Home;