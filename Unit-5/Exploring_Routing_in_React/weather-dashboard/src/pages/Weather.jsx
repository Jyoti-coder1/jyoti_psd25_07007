import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Weather() {
    const { city } = useParams();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = '54eef11044d99396b895b4cd11cc1059';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((res) => res.json())
        .then((data) => {
            setWeather(data);
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [city]);

    if (loading) return <p>Loading...</p>;
    if (!weather || weather.cod !== 200) return <p>City not found</p>;

    return (
        <div className="weather-info">
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Condition: {weather.weather[0].main}</p>

            {/* Optional Google Map */}
            <iframe
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${weather.name}`}
            ></iframe>
        </div>
    );
}

export default Weather;