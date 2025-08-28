import { Box, Heading } from '@chakra-ui/react'
import BookForm from '../components/BookForm'
import Filter from '../components/Filter'
import BookList from '../components/BookList'

export default function Home() {
    return (
        <Box p={6}>
            <Heading mb={4}>Book store with Redux</Heading>
            <BookForm />
            <Filter />
            <BookList />
        </Box>
    );
}