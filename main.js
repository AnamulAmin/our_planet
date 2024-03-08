const earth = document.querySelector(".earth"); // Selecting the element with the class "earth"
const galaxy = document.querySelector(".galaxy"); // Selecting the element with the class "galaxy"

let isMoving = false; // Variable to track if the element is currently being moved
let movingValue = 0; // Variable to store the value of movement

function movingEarth(e) {
  if (!isMoving) return; // Exit the function if not currently moving

  if (e.type === "touchmove") {
    movingValue = e.touches[0].clientX; // Update movingValue based on touch movement
    earth.style.backgroundPositionX = `${movingValue}px`; // Move the background position of the earth element
    galaxy.style.backgroundPositionX = `${-movingValue}px`; // Move the background position of the galaxy element
  } else {
    movingValue += e.movementX; // Update movingValue based on mouse movement
    earth.style.backgroundPositionX = `${movingValue + 220}px`; // Move the background position of the earth element
    galaxy.style.backgroundPositionX = `${-(movingValue - 220)}px`; // Move the background position of the galaxy element
  }
}

function movingEarthStart() {
  isMoving = true; // Set isMoving to true when movement starts
  galaxy.classList.add("grabbing"); // Add the class "grabbing" for styling
}

function movingStop() {
  galaxy.classList.remove("grabbing"); // Remove the class "grabbing"
  isMoving = false; // Set isMoving to false to stop movement
}

galaxy.addEventListener("mousedown", movingEarthStart); // Start moving on mouse click
galaxy.addEventListener("touchstart", movingEarthStart); // Start moving on touch

galaxy.addEventListener("mouseup", movingStop); // Stop moving on mouse release
galaxy.addEventListener("touchend", movingStop); // Stop moving on touch release

galaxy.addEventListener("mousemove", movingEarth); // Move element with mouse movement
galaxy.addEventListener("touchmove", movingEarth); // Move element with touch movement
