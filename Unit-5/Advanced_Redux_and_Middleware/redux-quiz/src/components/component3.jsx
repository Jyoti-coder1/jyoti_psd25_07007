import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../redux/reducer2";
import { updateScore } from "../redux/reducer3";
import { useNavigate } from "react-router-dom";

export default function Component3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, loading } = useSelector((store) => store.quiz);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        dispatch(fetchQuiz());
    }, [dispatch]);

    const handleAnswer = (option) => {
        if (option === questions[current].correctOption) {
            dispatch(updateScore(1));
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            navigate("/result");
        }
    };

    if (loading) return <Text>Loading...</Text>;
    if (!questions.length) return <Text>No Questions Found</Text>;

    return (
        <Box maxW="lg" m="auto" mt="50px" p="6" boxShadow="lg" borderRadius="md" bg="gray.50">
            <VStack spacing={4}>
                <Text fontSize="xl">{questions[current].question}</Text>
                {questions[current].options.map((opt, i) => (
                    <Button key={i} colorScheme="teal" w="100%" onClick={() => handleAnswer(i + 1)}>
                        {opt}
                    </Button>
                ))}
                <Button onClick={nextQuestion} colorScheme="gray">Skip</Button>
            </VStack>
        </Box>
    );
}