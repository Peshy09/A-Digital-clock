// script.js
const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const themeToggle = document.getElementById('theme-toggle');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let stopwatchInterval;
let stopwatchSeconds = 0;

function updateClock() {
  const now = new Date();

  // Get the current time components
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  // Update the DOM elements
  hourElement.textContent = hour;
  minuteElement.textContent = minute;
  secondElement.textContent = second;
}

function updateStopwatch() {
  stopwatchSeconds++;
  const hours = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(stopwatchSeconds % 60).padStart(2, '0');
  hourElement.textContent = hours;
  minuteElement.textContent = minutes;
  secondElement.textContent = seconds;
}

function updateBackground() {
  document.body.style.background = `radial-gradient(circle at top left, ${color1Input.value} 0%, ${color2Input.value} 100%)`;
}

color1Input.addEventListener('input', updateBackground);
color2Input.addEventListener('input', updateBackground);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

startButton.addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

resetButton.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  hourElement.textContent = '00';
  minuteElement.textContent = '00';
  secondElement.textContent = '00';
});

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();