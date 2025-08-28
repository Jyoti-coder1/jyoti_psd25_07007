import { useSelector, useDispatch } from "react-redux";
import { toggleRead, deleteBook, editBook } from "../redux/bookSlice";
import { Box, Button, Stack, Text, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function BookList() {
    const books = useSelector(state => state.books);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: "", author: "", genre: "" });
    const startEditing = (book) => {
        setEditId(book.id);
        setFormData({ title: book.title, author: book.author, genre: book.genre });
    };
    const saveEdit = () => {
        dispatch(editBook({ id: editId, updatedBook: formData }));
        setEditId(null);
        setFormData({ title: "", author: "", genre: "" });
    };
    const filteredBooks = books.filter(book => {
        if (filters.status === "read" && !book.read) return false;
        if (filters.status === "unread" && book.read) return false;
        if (filters.genre !== "all" && book.genre.toLowerCase() !== filters.genre.toLowerCase()) return false;
        if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
        return true;
    });
    return (
        <Stack spacing={3} mt={4}>
            {filteredBooks.map(book => (
                <Box key={book.id} p={3} borderWidth="1px" borderRadius="lg" bg="white">
                    {editId === book.id ? (
                        <>
                            <Input
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Title"
                                mb={2}
                            />
                            <Input
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                                placeholder="Author"
                                mb={2}
                            />
                            <Input
                                value={formData.genre}
                                onChange={e => setFormData({ ...formData, genre: e.target.value })}
                                placeholder="Genre"
                                mb={2}
                            />
                            <Stack direction="row" mt={2}>
                                <Button size="sm" colorScheme="teal" onClick={saveEdit}>
                                    Save
                                </Button>
                                <Button size="sm" onClick={() => setEditId(null)}>
                                    Cancel
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Text><b>{book.title}</b> by {book.author} ({book.genre})</Text>
                            <Text>Status: {book.read ? "Read" : "Unread"}</Text>
                            <Stack direction="row" mt={2}>
                                <Button size="sm" onClick={() => dispatch(toggleRead(book.id))}>
                                    Toggle Read
                                </Button>
                                <Button size="sm" onClick={() => startEditing(book)}>
                                    Edit
                                </Button>
                                <Button size="sm" colorScheme="red" onClick={() => dispatch(deleteBook(book.id))}>
                                    Delete
                                </Button>
                            </Stack>
                        </>
                    )}
                </Box>
            ))}
        </Stack>
    );
}