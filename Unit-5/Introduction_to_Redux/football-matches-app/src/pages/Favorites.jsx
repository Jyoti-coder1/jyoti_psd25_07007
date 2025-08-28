import { useSelector } from "react-redux";
import MatchCard from "../components/MatchCard";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

function Favorites() {
    const favorites = useSelector((state) => state.favorites);

    return (
        <Box p="4">
            <Text fontSize="2xl" mb="4">Favorite Matches</Text>
            <SimpleGrid columns={[1, 2, 3]} spacing="4">
                {favorites.length === 0 ? (
                    <Text>No favorites yet</Text>
                ) : (
                    favorites.map((match) => <MatchCard key={match.match_id} match={match} />)
                )}
            </SimpleGrid>
        </Box>
    );
}

export default Favorites;