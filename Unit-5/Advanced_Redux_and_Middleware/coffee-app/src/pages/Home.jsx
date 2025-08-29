import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import CoffeeList from "../components/CoffeeList";

const Home = () => {
    return (
        <Flex>
            <Box w="250px" bg="gray.100" p={4}>
                <Sidebar />
            </Box>
            <Box flex="1">
                <CoffeeList />
            </Box>
        </Flex>
    );
};

export default Home;