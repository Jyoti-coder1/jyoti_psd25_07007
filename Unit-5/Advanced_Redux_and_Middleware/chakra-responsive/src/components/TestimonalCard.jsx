import { Box, Text, Avatar, Flex } from "@chakra-ui/react";

const TestimonialCard = ({ title, text, name, role, img }) => {
    return (
        <Flex direction="column" align="center">
            {/* Speech bubble box */}
            <Box
                bg="white"
                p={6}
                rounded="2xl"
                shadow="md"
                textAlign="center"
                position="relative"
                maxW="400px"
            >
                {/* Title */}
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {title}
                </Text>

                {/* Description */}
                <Text fontSize="sm" color="gray.600">
                    {text}
                </Text>

                {/* Small triangle */}
                <Box
                    position="absolute"
                    bottom="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    width="0"
                    height="0"
                    borderLeft="12px solid transparent"
                    borderRight="12px solid transparent"
                    borderTop="12px solid white"
                />
            </Box>

            {/* Avatar + Name BELOW the box */}
            <Flex direction="column" align="center" mt={8}>
                <Avatar size="md" src={img} />
                <Text fontWeight="bold" mt={2}>
                    {name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {role}
                </Text>
            </Flex>
        </Flex>
    );
};

export default TestimonialCard;