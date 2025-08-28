import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/actions";

function MatchCard({ match }) {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    const isFav = favorites.some((m) => m.match_id === match.match_id);

    return (
        <Box border="1px solid #ddd" borderRadius="md" p="4" boxShadow="md" bg="white">
            <Text fontWeight="bold">{match.team1} vs {match.team2}</Text>
            <Text>Date: {match.date}</Text>
            <Text>Venue: {match.venue || "Unknown"}</Text>
            <Text>Winner: {match.winner || "Draw"}</Text>

            {/* Example extra stats from API */}
            <Text>Team1 Goals: {match.team1goals || 0}</Text>
            <Text>Team2 Goals: {match.team2goals || 0}</Text>
            <Text>Team1 Yellow Cards: {match.team1_yellow_cards || 0}</Text>
            <Text>Team2 Yellow Cards: {match.team2_yellow_cards || 0}</Text>

            {isFav ? (
                <Button mt="2" colorScheme="red" onClick={() => dispatch(removeFavorite(match.match_id))}>
                    Remove Favorite
                </Button>
            ) : (
                <Button mt="2" colorScheme="teal" onClick={() => dispatch(addFavorite(match))}>
                    Add Favorite
                </Button>
            )}
        </Box>
    );
}

export default MatchCard;