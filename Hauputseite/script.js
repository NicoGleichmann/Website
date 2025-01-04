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
let isDragging = false; //für ziehen
let startX; //für ziehen
let scrollLeft; //für ziehen

window.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        container.scrollLeft += e.deltaY; // Scrollt horizontal statt vertikal
        e.preventDefault();
    }
})


container.addEventListener("mousedown", (e) => {
    isDragging = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
    container.classList.remove("active");
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
    scrollContainer.classList.remove("active");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll sensitivity
    container.scrollLeft = scrollLeft - walk;
  });


// Alert
//alert("Nutze das Mausrad zum scrollen des Bildschirms!");

// Links für Container
const emailbox = document.getElementById("email_box");
const instabox = document.getElementById("insta");

emailbox.addEventListener("click", () => {
    window.location.href = "https://mail.google.com/mail/u/0/?pli=1#inbox";
});

instabox.addEventListener("click", () => {
    window.location.href = "https://www.instagram.com/nico.gleichmann/";
});





