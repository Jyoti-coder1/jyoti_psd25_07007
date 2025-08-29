import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { resetScore } from "../redux/reducer3";
import { useNavigate } from "react-router-dom";

export default function Component4() {
    const { score } = useSelector((store) => store.score);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRestart = () => {
        dispatch(resetScore());
        navigate("/quiz");
    };

    return (
        <Box maxW="sm" m="auto" mt="50px" p="6" boxShadow="lg" borderRadius="md" bg="gray.50">
            <VStack spacing={4}>
                <Text fontSize="2xl">Your Score: {score}</Text>
                <Button colorScheme="teal" onClick={handleRestart}>Retry Quiz</Button>
            </VStack>
        </Box>
    );
}