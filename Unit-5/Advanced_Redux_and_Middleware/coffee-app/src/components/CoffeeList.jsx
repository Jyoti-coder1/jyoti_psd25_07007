import { useSelector } from "react-redux";
import { SimpleGrid, Box, Image, Text, Spinner } from "@chakra-ui/react";

const CoffeeList = () => {
    const { loading, data, error } = useSelector((state) => state.coffee);

    if (loading) return <Spinner size="xl" mt={10} />;
    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} p={4}>
            {data.map((coffee) => (
                <Box key={coffee.id} p={4} shadow="md" borderWidth="1px" borderRadius="2xl">
                    <Image src={coffee.image} alt={coffee.title} borderRadius="lg" />
                    <Text fontSize="xl" fontWeight="bold" mt={2}>{coffee.title}</Text>
                    <Text>Price: ${coffee.price}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default CoffeeList;