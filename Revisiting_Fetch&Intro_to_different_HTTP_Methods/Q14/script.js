// Select DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');

// Handle form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim(); //Trim input to remove extra spaces

    //Input validation: Check if city name is empty
    if (!city) {
        weatherDisplay.textContent = 'Please enter a city name.'; //Show friendly message for empty input
        return;
    }

    fetchWeather(city); //Call fetchWeather only if input is valid
});

async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace this with your actual OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    //  encodeURIComponent handles special characters like spaces in city names
    //  Added units=metric to get temperature in °C

    try {
        const response = await fetch(url);

        //  Error handling for non-200 HTTP responses
        if (!response.ok) {
            if (response.status === 404) {
                weatherDisplay.textContent = 'City not found. Please enter a valid city name.'; //Specific message for city not found
            } else {
                weatherDisplay.textContent = `Error: ${response.status} ${response.statusText}`; //General HTTP error message
            }
            return; // Stop function if error occurred
        }

        const data = await response.json(); // Parse JSON from API response

        // Extract and display relevant weather data
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        weatherDisplay.textContent = `Weather in ${cityName }: ${temp }°C, ${description }`; //Clear and readable output
    } catch (error) {

        // Catch and display network or unexpected errors
        weatherDisplay.textContent = 'Failed to fetch weather data. Please check your connection.';
        console.error('Fetch error:', error); //Log actual error to console for debugging
    }
}