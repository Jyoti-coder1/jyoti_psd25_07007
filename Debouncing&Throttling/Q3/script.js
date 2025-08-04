const img = document.getElementById("img"); // image element
const prev = document.getElementById("prev"); // previous button
const next = document.getElementById("next"); // next button
const slideNum = document.getElementById("slideNum"); // slide number display

let slide = 1; // current slide number
let lastClick = 0; // last allowed image update time
let clickTimes = []; // timestamps of all clicks in 1 second

// updateImage handles both throttling and spam detection
function updateImage(change) {
    const now = Date.now(); // current time in ms

    clickTimes = clickTimes.filter(t => now - t < 1000); // keep only last 1 sec clicks
    clickTimes.push(now); // add current click time

    if (clickTimes.length > 3) { // if more than 3 clicks in 1 second
        alert("Chill chill, loading it!!");
        return; // do not change image
    }

    if (now - lastClick >= 1000) { // if at least 1 second passed since last image update
        lastClick = now; // update last allowed time
        slide += change; // change slide number
        if (slide < 1) slide = 1; // prevent slide from going below 1
        img.src = `https://picsum.photos/600/400?random=${Math.random()}`; // set new random image
        slideNum.textContent = `Slide #${slide}`; // update slide number
    }
}

next.addEventListener("click", () => updateImage(1)); // go to next slide
prev.addEventListener("click", () => updateImage(-1)); // go to previous slide