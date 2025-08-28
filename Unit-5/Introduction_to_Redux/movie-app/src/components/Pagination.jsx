import { Button, Flex } from "@chakra-ui/react";

const Pagination = ({ currentPage, onPageChange }) => {
    return (
        <Flex justify="center" m={4} gap={2}>
            <Button onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage === 1}>Prev</Button>
            <Button>{currentPage}</Button>
            <Button onClick={() => onPageChange(currentPage + 1)}>Next</Button>
        </Flex>
    );
};
export default Pagination;