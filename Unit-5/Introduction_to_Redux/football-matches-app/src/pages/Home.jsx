import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches, addNotification } from "../redux/actions";
import MatchCard from "../components/MatchCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { Box, Spinner, SimpleGrid, Text, useToast } from "@chakra-ui/react";

function Home() {
    const dispatch = useDispatch();
    const toast = useToast();
    const { isLoading, isError, footballMatches, searchQuery, filters, notifications } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    // Notify user about upcoming matches
    useEffect(() => {
        footballMatches.forEach((m) => {
            const matchDate = new Date(m.date);
            const today = new Date();
            if (matchDate > today) {
                const message = `Upcoming Match: ${m.team1} vs ${m.team2} on ${m.date}`;
                if (!notifications.includes(message)) {
                    dispatch(addNotification(message));
                    toast({
                        title: "Upcoming Match",
                        description: message,
                        status: "info",
                        duration: 4000,
                        isClosable: true,
                    });
                }
            }
        });
    }, [footballMatches, dispatch, toast, notifications]);

    const filteredMatches = footballMatches.filter((m) => {
        const searchMatch =
            m.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.team2.toLowerCase().includes(searchQuery.toLowerCase());
        const teamFilter = filters.team ? (m.team1 === filters.team || m.team2 === filters.team) : true;
        const resultFilter = filters.result ? (m.winner === filters.result) : true;
        const dateFilter = filters.date ? m.date.startsWith(filters.date) : true;
        return searchMatch && teamFilter && resultFilter && dateFilter;
    });

    return (
        <Box p="4">
            <SearchBar />
            <FilterBar />
            {isLoading && <Spinner />}
            {isError && <Text color="red">Error loading matches</Text>}
            <SimpleGrid columns={[1, 2, 3]} spacing="4" mt="4">
                {filteredMatches.map((match) => (
                    <MatchCard key={match.match_id} match={match} />
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default Home;