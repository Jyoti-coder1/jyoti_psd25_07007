import { Container } from "@chakra-ui/react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  return (
    <Container maxW="md" py={10}>
      <VStack spacing={5}>
        <Heading>Redux Todo App</Heading>
        <TodoInput />
        <TodoList />
      </VStack>
    </Container>
  );
}

export default App;
