// Get the gallery container
const gallery = document.getElementById("gallery");

// Track current start index for API call
let start = 0;
const limit = 10; // Load 10 images at a time

// Track if data is currently being fetched
let isLoading = false;

// Fetch images from the API and append them to the DOM
async function fetchImages() {
    // Avoid fetching if already loading
    if (isLoading) return;

    isLoading = true; // Mark loading as true

    try {
        // Fetch limited number of images with start and limit
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
        const photos = await res.json();

        // Append each image to the gallery
        photos.forEach((photo) => {
            const img = document.createElement("img");
            img.src = photo.url;
            img.alt = photo.title;
            gallery.appendChild(img);
        });

        // Update start index for next fetch
        start += limit;
    } catch (err) {
        console.error("Error fetching images:", err);
    } finally {
        isLoading = false; // Done loading
    }
}

// Detect when user reaches bottom of page
window.addEventListener("scroll", () => {
    // If scrolled near bottom, fetch next images
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchImages();
    }
});

// Initial load
fetchImages(); // Load first 10 images on page load