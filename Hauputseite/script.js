const themeButton = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = true;

// Theme Toggle
themeButton.addEventListener('click', () => {
    if (isDarkMode) {
        body.style.backgroundColor = '#030303';
        body.style.color = '#030303 ';
        themeButton.textContent = '☀️';
    } else {
        body.style.backgroundColor = '#fff';
        body.style.color = '#fff';
        themeButton.textContent = '🌙';
    }
    isDarkMode = !isDarkMode;
});



// Links für Container
const emailbox = document.getElementById("email_box");
const instabox = document.getElementById("insta");
const instabox2 = document.getElementById("insta2");

emailbox.addEventListener("click", () => {
    window.location.href = "https://mail.google.com/mail/u/0/?pli=1#inbox";
});

instabox.addEventListener("click", () => {
    window.location.href = "https://www.instagram.com/nico.gleichmann/";
});




//INSTA BOX 6
instabox2.addEventListener("click", () => {
  window.location.href = "https://www.instagram.com/nico.gleichmann/";
});
insta2.addEventListener("mouseover", () => {
  insta2.style.cursor = "pointer";
});
// (Optional) Cursor wieder normal setzen, wenn der Benutzer den Bereich verlässt
insta2.addEventListener("mouseout", () => {
  insta2.style.cursor = "default"; // Standard-Cursor
});
let currentIndex = 0;

function moveSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  currentIndex = index;
  
  // Update the slider position
  const slider = document.querySelector('.slider, .image-container');
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update active class for dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}


//INSTAGRAM LINK
const instagramLink = document.getElementById('instagram_link');

instagramLink.addEventListener('mouseover', () => {
  instagramLink.textContent = 'Instagram'; // Ändert den Text zu "Instagram"
  instagramLink.style.textDecoration = 'underline'; // Fügt einen Unterstrich hinzu
});

instagramLink.addEventListener('mouseout', () => {
  instagramLink.textContent = 'Nico Gleichmann'; // Setzt den Text zurück
  instagramLink.style.textDecoration = 'none'; // Entfernt den Unterstrich
});




//FOOTER
document.addEventListener("DOMContentLoaded", () => {
  const infoContainer = document.querySelector(".info-container");
  const dropdown = document.querySelector(".info-dropdown");

  // Öffnen des Dropdown-Menüs beim Hover
  infoContainer.addEventListener("mouseenter", () => {
      if (!infoContainer.classList.contains("active")) {
          dropdown.style.display = "block";  // Zeige das Dropdown an
      }
  });

  // Schließen des Dropdowns, wenn die Maus den Container verlässt, wenn es nicht aktiv ist
  infoContainer.addEventListener("mouseleave", () => {
      if (!infoContainer.classList.contains("active")) {
          dropdown.style.display = "none";  // Verstecke das Dropdown
      }
  });

  // Klick auf den Info-Container, um das Dropdown zu fixieren
  infoContainer.addEventListener("click", (event) => {
      event.stopPropagation(); // Verhindert das Schließen durch äußere Klicks
      infoContainer.classList.toggle("active"); // Toggle die Sichtbarkeit (bleibt offen)
      if (infoContainer.classList.contains("active")) {
          dropdown.style.display = "block";  // Zeige das Dropdown an
      } else {
          dropdown.style.display = "none";  // Verstecke das Dropdown
      }
  });

  // Schließen des Menüs, wenn irgendwo außerhalb des Dropdowns geklickt wird
  document.addEventListener("click", (event) => {
      if (!infoContainer.contains(event.target)) {
          dropdown.style.display = "none"; // Verstecke das Dropdown
          infoContainer.classList.remove("active"); // Entferne die "active"-Klasse
      }
  });
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
  e.preventDefault(); // Verhindert das Markieren von Text
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
  container.classList.remove("active");
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll sensitivity
  container.scrollLeft = scrollLeft - walk;
});

// CSS hinzufügen, um die Textauswahl zu verhindern
container.style.userSelect = "none";
container.style.webkitUserSelect = "none"; // Für ältere Safari-Versionen
container.style.msUserSelect = "none"; // Für ältere Edge-Versionen



//ANIMATION
const boxes = document.querySelectorAll('.case, .email-box, .lite, .box_top,  .full_width');

boxes.forEach(box => {
  if (!box.classList.contains('no-hover')) { // Überprüfe, ob die Klasse "no-hover" NICHT vorhanden ist
    box.addEventListener('mouseover', () => {
      box.style.transform = 'scale(1.1)';
      box.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    });

    box.addEventListener('mouseout', () => {
      box.style.transform = 'scale(1)';
      box.style.boxShadow = 'none';
    });
  }
});



//COOKIE BANNER

// Überprüfen, ob der Benutzer bereits zugestimmt hat
if (!getCookie('cookiesAccepted')) {
  // Zeige das Cookie-Banner, wenn der Benutzer noch nicht zugestimmt hat
  document.getElementById('cookie-banner').style.display = 'block';
}

// Wenn der Benutzer auf "Zustimmen" klickt, speichere die Zustimmung in einem Cookie
document.getElementById('accept-cookies').addEventListener('click', function() {
  setCookie('cookiesAccepted', 'true', 365);  // Setze das Cookie für 365 Tage
  document.getElementById('cookie-banner').style.display = 'none';  // Verstecke das Banner
});

// Funktion zum Setzen eines Cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // Ablaufdatum des Cookies
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Funktion zum Abrufen eines Cookies
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


// Alert
//alert("Nutze das Mausrad zum scrollen des Bildschirms!");