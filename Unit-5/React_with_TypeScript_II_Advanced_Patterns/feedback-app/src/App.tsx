import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Dashboard from './components/Dashboard';
import { Box, Button } from '@chakra-ui/react';

function App() {
  return (
    <BrowserRouter>
      <Box p="5">
        <Button as={Link} to="/" mr="3">Feedback Form</Button>
        <Button as={Link} to="/dashboard">Dashboard</Button>
      </Box>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;