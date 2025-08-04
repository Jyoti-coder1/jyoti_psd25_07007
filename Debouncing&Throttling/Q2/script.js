const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

let debounceTimer; // stores the timeout ID

input.addEventListener('input', () => {
    // clear previous timeout if user is still typing
    clearTimeout(debounceTimer);

    // wait 500ms after last keystroke before calling API
    debounceTimer = setTimeout(() => {
        const query = input.value.trim();

        if (query === '') {
            resultsDiv.innerHTML = '';
            return;
        }

        fetchMovies(query);
    }, 500);
});

// Fetch movie data from OMDB API
function fetchMovies(query) {
    const apiKey = 'e71e760a'; // Replace with your actual key
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // If movies found, display them
                if (data.Search) {
                    displayResults(data.Search);
                } else {
                    resultsDiv.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(err => {
                resultsDiv.innerHTML = '<p>Error fetching data.</p>';
            });
}

// Display movie titles in #results div
function displayResults(movies) {
    resultsDiv.innerHTML = '';
    movies.forEach(movie => {
        const p = document.createElement('p');
        p.textContent = movie.Title;
        resultsDiv.appendChild(p);
    });
}