const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
  // Toggle between light-mode and dark-mode
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  // Update button text
  if (body.classList.contains('dark-mode')) {
    themeToggleButton.textContent = 'Switch to Light Mode';
  } else {
    themeToggleButton.textContent = 'Switch to Dark Mode';
  }
});

// Terminal-style name animation
const nameElement = document.getElementById('name-animation');
const names = ["Matteo Da Venezia", "Lupus Artorias"];
let index = 0;
let letterIndex = 0;
let currentName = '';
let isDeleting = false;

function typeEffect() {
  currentName = names[index];
  if (isDeleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  nameElement.textContent = currentName.substring(0, letterIndex);

  if (!isDeleting && letterIndex === currentName.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500); // Pause before deleting
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    index = (index + 1) % names.length;
    setTimeout(typeEffect, 500); // Pause before typing the next name
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing speed
  }
}

document.addEventListener('DOMContentLoaded', typeEffect);
