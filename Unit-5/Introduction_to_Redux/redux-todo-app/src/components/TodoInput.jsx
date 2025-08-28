import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../redux/actions"
import { Input, Button, HStack } from "@chakra-ui/react"

const TodoInput = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (text.trim() !== "") {
            dispatch(addTodo(text));
            setText("");
        }
    };

    return (
        <HStack spacing={3} mb={5}>
            <Input
                placeholder="Enter todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleAdd}>
                Add
            </Button>
        </HStack>
    );
};

export default TodoInput;