const rainContainer = document.getElementById("rain-container");

function createVector() {
    const vector = document.createElement("div");
    vector.classList.add("vector");
    vector.style.left = `${Math.random() * 100}vw`;
    vector.style.transform = `rotate(${Math.random() * 360}deg)`; // Set random rotation angle
    rainContainer.appendChild(vector);
    setTimeout(() => {
        vector.remove();
    }, 5000);
}

setInterval(createVector, 250); // 4 vectors per second (1000 ms / 4 = 250 ms)
