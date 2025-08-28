import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Box, Flex, Button } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Flex bg="teal.500" p="4" justify="space-around" color="white">
        <Link to="/"><Button colorScheme="teal" variant="solid">Home</Button></Link>
        <Link to="/favorites"><Button colorScheme="teal" variant="outline">Favorites</Button></Link>
      </Flex>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Box>
  );
}

export default App;