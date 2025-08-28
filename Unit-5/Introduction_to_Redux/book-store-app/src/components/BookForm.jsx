import { useDispatch } from "react-redux";
import { addBook } from "../redux/bookSlice";
import { useState } from "react";
import { Button, Input, Stack } from "@chakra-ui/react";

export default function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author || !genre) return;
        dispatch(addBook({ title, author, genre }));
        setTitle("");
        setAuthor("");
        setGenre("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Input
                    placeholder="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <Input
                    placeholder="Genre"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />
                <Button type="submit" colorScheme="teal">Add</Button>
            </Stack>
        </form>
    );
}