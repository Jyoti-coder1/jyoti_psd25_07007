import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { VStack, Text } from "@chakra-ui/react"

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    return (
        <VStack spacing={3} align="stretch">
            {todos.length === 0 ? (
                <Text color="gray.500" textAlign="center">
                    No todos available
                </Text>
            ) : (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
        </VStack>
    );
};

export default TodoList;