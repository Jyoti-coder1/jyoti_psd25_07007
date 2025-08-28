import { Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/actions";

function SearchBar() {
    const dispatch = useDispatch();
    return (
        <Input
            placeholder="Search by team..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
        />
    );
}

export default SearchBar;