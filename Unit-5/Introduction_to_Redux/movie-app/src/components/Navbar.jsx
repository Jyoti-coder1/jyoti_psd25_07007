import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <Flex bg="teal.500" p={4} justify="space-between" align="center">
            <Flex gap={4}>
                <Link to="/">Home</Link>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/booking">Booking</Link>
            </Flex>
            {isAuthenticated ? (
                <Button colorScheme="red" onClick={() => dispatch(logout())}>Logout</Button>
            ) : (
                <Link to="/login"><Button colorScheme="blue">Login</Button></Link>
            )}
        </Flex>
    );
};
export default Navbar;