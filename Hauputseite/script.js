const themeButton = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = true;

// Theme Toggle
themeButton.addEventListener('click', () => {
    if (isDarkMode) {
        body.style.backgroundColor = '#030303';
        body.style.color = '#fff';
        themeButton.textContent = '☀️';
    } else {
        body.style.backgroundColor = '#fff';
        body.style.color = '#030303';
        themeButton.textContent = '🌙';
    }
    isDarkMode = !isDarkMode;
});

// Mausrad Scroll für horizontales Bewegen
const container = document.querySelector('.container');
window.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        container.scrollLeft += e.deltaY; // Scrollt horizontal statt vertikal
        e.preventDefault();
    }
})


// alert("Nutze das Mausrad zum scrollen!");




