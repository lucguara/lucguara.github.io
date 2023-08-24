document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");

    video.addEventListener("canplaythrough", () => {
        video.currentTime = 1;
        video.play(); // Play the video
    });
    const rainContainer = document.getElementById("rain-container");

    function createVector() {
        const vector = document.createElement("div");
        vector.classList.add("vector");
        vector.style.left = `${Math.random() * 100}vw`;
        vector.style.backgroundImage = "url('pastel.png')"; // Adjust image path
        rainContainer.appendChild(vector);
        setTimeout(() => {
            vector.remove();
        }, 5000);
    }

    setInterval(createVector, 250); // Adjust timing as needed
});
