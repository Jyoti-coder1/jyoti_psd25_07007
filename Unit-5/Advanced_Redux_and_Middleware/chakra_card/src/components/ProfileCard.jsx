import { Box, Image, Text, Button, HStack, Tag, Avatar, AvatarBadge } from "@chakra-ui/react";

const ProfileCard = () => {
  return (
    <Box
      maxW="sm"
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
    >
      {/* Profile Picture with Badge */}
      <Avatar size="2xl" src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=300&h=300&fit=crop&crop=faces" mx="auto" mb={4}>
        <AvatarBadge boxSize="1.2em" bg="green.400" borderColor="white" />
      </Avatar>

      {/* Name and Handle */}
      <Text fontSize="2xl" fontWeight="bold">
        Lindsey James
      </Text>
      <Text fontSize="md" color="gray.500" mb={4}>
        @lindsey_jam3s
      </Text>

      {/* Bio */}
      <Text fontSize="sm" color="gray.600" mb={4}>
        Actress, musician, songwriter and artist. PM for work inquires
        <br /> or <Text as="span" color="blue.400">#tag</Text> me in your posts
      </Text>

      {/* Tags */}
      <HStack spacing={3} justify="center" mb={6} wrap="wrap">
        <Tag>#ART</Tag>
        <Tag>#PHOTOGRAPHY</Tag>
        <Tag>#MUSIC</Tag>
      </HStack>

      {/* Buttons */}
      <HStack spacing={4} justify="center">
        <Button variant="outline" borderRadius="full" px={6}>
          Message
        </Button>
        <Button colorScheme="blue" borderRadius="full" px={6}>
          Follow
        </Button>
      </HStack>
    </Box>
  );
};

export default ProfileCard;