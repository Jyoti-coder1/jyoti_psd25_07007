import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../redux/feedbackSlice';
import { Box, Input, Textarea, Button, NumberInput, NumberInputField } from '@chakra-ui/react';

export default function FeedbackForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(1);
    const [comments, setComments] = useState('');

    const handleSubmit = () => {
        dispatch(addFeedback({
            id: Date.now(),
            name,
            email,
            rating,
            comments,
            date: new Date().toISOString()
        }));
        
        setName('');
        setEmail('');
        setRating(1);
        setComments('');
    };

    return (
        <Box p="5" maxWidth="400px" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} mb="3" />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb="3" />
            <NumberInput min={1} max={5} value={rating} mb="3" onChange={(_, val) => setRating(val)}>
                <NumberInputField />
            </NumberInput>
            <Textarea placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} mb="3" />
            <Button colorScheme="blue" onClick={handleSubmit}>Submit Feedback</Button>
        </Box>
    );
}