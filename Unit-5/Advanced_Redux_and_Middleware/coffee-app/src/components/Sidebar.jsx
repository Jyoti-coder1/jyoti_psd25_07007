import { VStack, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { fetchCoffee } from "../redux/coffeeActions";

const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <VStack spacing={4} p={4} align="stretch">
            <Button colorScheme="teal" onClick={() => dispatch(fetchCoffee("asc"))}>
                Sort by Price: Low to High
            </Button>
            <Button colorScheme="teal" onClick={() => dispatch(fetchCoffee("desc"))}>
                Sort by Price: High to Low
            </Button>
        </VStack>
    );
};

export default Sidebar;