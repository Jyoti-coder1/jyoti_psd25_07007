import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducer1";
import { useNavigate } from "react-router-dom";

export default function Component2() {
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuth } = useSelector((store) => store.auth);

    const handleSubmit = () => {
        dispatch(loginUser(email, password)).then(() => {
            navigate("/quiz");
        });
    };

    return (
        <Box maxW="sm" m="auto" mt="50px" p="6" boxShadow="lg" borderRadius="md" bg="gray.50">
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">Login</Text>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button colorScheme="teal" onClick={handleSubmit} isLoading={loading}>Login</Button>
                {error && <Text color="red.500">Invalid Credentials</Text>}
            </VStack>
        </Box>
    );
}