import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducer1";
import { Link } from "react-router-dom";

export default function Component1() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store) => store.auth);

    return (
        <Flex bg="purple.500" p="4" justify="space-between" align="center">
            <Text fontSize="xl" color="white">Quiz App</Text>
            <Box>
                <Button as={Link} to="/" colorScheme="teal" mr="2">Home</Button>
                {isAuth ? (
                    <Button onClick={() => dispatch(logoutUser())} colorScheme="red">Logout</Button>
                ) : (
                    <Button as={Link} to="/login" colorScheme="teal">Login</Button>
                )}
            </Box>
        </Flex>
    );
}