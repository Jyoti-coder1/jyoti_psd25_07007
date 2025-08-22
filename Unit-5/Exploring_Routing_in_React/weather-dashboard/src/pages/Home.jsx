import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
            navigate(`/weather/${city}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Weather Dashboard</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={city} placeholder="Enter city name" onChange={(e) => setCity(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default Home;