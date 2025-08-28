import { useDispatch } from "react-redux"
import { toggleTodo, deleteTodo } from "../redux/actions"
import { HStack, Text, Button } from "@chakra-ui/react"

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    return (
        <HStack
            justify="space-between"
            w="100%"
            p={3}
            borderWidth="1px"
            borderRadius="lg"
        >
            <Text
                as={todo.status ? "s" : ""}
                fontSize="lg"
                cursor="pointer"
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
                {todo.title}
            </Text>
            <Button
                colorScheme="red"
                size="sm"
                onClick={() => dispatch(deleteTodo(todo.id))}
            >
                Delete
            </Button>
        </HStack>
    );
};

export default TodoItem;