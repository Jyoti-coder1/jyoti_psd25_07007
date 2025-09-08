import { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { Box, Heading, Select, Input, Flex, Button } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const feedbackList = useSelector((state: RootState) => state.feedback.feedbackList);
    const [ratingFilter, setRatingFilter] = useState<number | 'All'>('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredFeedback = feedbackList.filter(f => {
        const matchesRating = ratingFilter === 'All' ? true : f.rating === ratingFilter;
        const matchesStart = startDate ? new Date(f.date) >= new Date(startDate) : true;
        const matchesEnd = endDate ? new Date(f.date) <= new Date(endDate) : true;
        return matchesRating && matchesStart && matchesEnd;
    });

    const ratings = [1, 2, 3, 4, 5];
    const ratingCount = ratings.map(r => filteredFeedback.filter(f => f.rating === r).length);

    const data = {
        labels: ratings.map(r => `Rating ${r}`),
        datasets: [
            {
                label: 'Feedback Count',
                data: ratingCount,
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }
        ]
    };

    return (
        <Box p="5">
            <Heading mb="5">Feedback Dashboard</Heading>
            <Flex mb="5" gap="3" flexWrap="wrap">
                <Select
                    w="150px"
                    value={ratingFilter}
                    onChange={e => setRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                >
                    <option value="All">All Ratings</option>
                    <option value={1}>Rating 1</option>
                    <option value={2}>Rating 2</option>
                    <option value={3}>Rating 3</option>
                    <option value={4}>Rating 4</option>
                    <option value={5}>Rating 5</option>
                </Select>

                <Input
                    type="date"
                    w="150px"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                <Input
                    type="date"
                    w="150px"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />

                <Button onClick={() => { setRatingFilter('All'); setStartDate(''); setEndDate(''); }}>
                    Reset Filters
                </Button>
            </Flex>

            <Box maxW="600px">
                <Bar data={data} />
            </Box>
        </Box>

    );
}