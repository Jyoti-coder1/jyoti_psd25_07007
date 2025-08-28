import { useDispatch } from "react-redux";
import { setStatus, setGenre, setAuthor } from "../redux/filterSlice";
import { Stack, Select, Input } from "@chakra-ui/react";

export default function Filter() {
    const dispatch = useDispatch();

    return (
        <Stack direction="row" spacing={2} mt={4}>
            <Select onChange={e => dispatch(setStatus(e.target.value))}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </Select>
            <Select onChange={e => dispatch(setGenre(e.target.value))}>
                <option value="all">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Non-Fiction</option>
            </Select>
            <Input
                placeholder="Filter by Author"
                onChange={e => dispatch(setAuthor(e.target.value))}
            />
        </Stack>
    );
}