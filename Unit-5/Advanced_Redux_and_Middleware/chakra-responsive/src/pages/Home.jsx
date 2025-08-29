import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import TestimonialCard from "../components/TestimonalCard";

const testimonials = [
    {
        title: "Efficient Collaborating",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
        name: "Jane Cooper",
        role: "CEO at ABC Corporation",
        img: "https://i.pravatar.cc/150?img=32",
    },
    {
        title: "Intuitive Design",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
        name: "Jane Cooper",
        role: "CEO at ABC Corporation",
        img: "https://i.pravatar.cc/150?img=33",
    },
    {
        title: "Mindblowing Service",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
        name: "Jane Cooper",
        role: "CEO at ABC Corporation",
        img: "https://i.pravatar.cc/150?img=34",
    },
];

const Home = () => {
    return (
        <Box bg="gray.100" py={16} px={6} textAlign="center">
            <Heading size="xl" mb={2}>
                Our Clients Speak
            </Heading>
            <Text color="gray.600" mb={12}>
                We have been working with clients around the world
            </Text>

            {/* Responsive Grid */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                {testimonials.map((t, i) => (
                    <TestimonialCard key={i} {...t} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;