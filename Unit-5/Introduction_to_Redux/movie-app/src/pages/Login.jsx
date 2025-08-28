import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Box, Input, Button } from "@chakra-ui/react";

const Login = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (username.trim() === "") return;
        dispatch(login({ name: username }));
    };

    return (
        <Box p={4}>
            <Input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button mt={2} colorScheme="blue" onClick={handleLogin}>Login</Button>
        </Box>
    );
};
export default Login;