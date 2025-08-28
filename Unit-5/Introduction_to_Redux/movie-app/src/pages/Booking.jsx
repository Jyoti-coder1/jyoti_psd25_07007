import { Box, Text, Button } from "@chakra-ui/react";

const Booking = () => {
    return (
        <Box p={4}>
            <Text fontSize="xl">Book Your Tickets (Mock UI)</Text>
            <Button mt={2} colorScheme="green">Proceed to Payment</Button>
        </Box>
    );
};
export default Booking;