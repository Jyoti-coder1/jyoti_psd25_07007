import { Box, Select, Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/actions";

function FilterBar() {
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        dispatch(setFilters({ [e.target.name]: e.target.value }));
    };

    return (
        <Box display="flex" gap="4" mt="4" flexWrap="wrap">
            <Select name="team" placeholder="Filter by Team" onChange={handleFilter}>
                <option value="Barcelona">Barcelona</option>
                <option value="Real Madrid">Real Madrid</option>
                <option value="Chelsea">Chelsea</option>
            </Select>

            <Select name="result" placeholder="Filter by Result" onChange={handleFilter}>
                <option value="team1">Team1 Won</option>
                <option value="team2">Team2 Won</option>
                <option value="draw">Draw</option>
            </Select>

            <Input
                type="date"
                name="date"
                placeholder="Filter by Date"
                onChange={handleFilter}
            />
        </Box>
    );
}

export default FilterBar;