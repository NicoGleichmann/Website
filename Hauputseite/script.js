const themeButton = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = true;

// Dark Mode beim Laden aktivieren
document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('dark-mode'); // Falls du eine CSS-Klasse für Dark Mode hast
    themeButton.textContent = '☀️'; // Setzt das richtige Symbol
    toggleFacebookImage(); // Bild für den initialen Modus setzen
});

// Theme Toggle
themeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('white-mode');
        themeButton.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('white-mode');
        themeButton.textContent = '🌙';
    }
    toggleFacebookImage(); // Bild je nach Mode wechseln
});

// Funktion, die das Bild je nach Modus anpasst
function toggleFacebookImage() {
    const facebookW = document.getElementById('facebook-w');
    const facebookD = document.getElementById('facebook-d');
    const youtubeW = document.getElementById('youtube-w');
    const youtubeD = document.getElementById('youtube-d');
    const black_01 = document.getElementById('black_01');
    const white_01 = document.getElementById('white_01');
    const black_02 = document.getElementById('black_02');
    const white_02 = document.getElementById('white_02');
    const black_03 = document.getElementById('black_03');
    const white_03 = document.getElementById('white_03');
    const black_04 = document.getElementById('black_04');
    const white_04 = document.getElementById('white_04');
    const black_05 = document.getElementById('black_05');
    const white_05 = document.getElementById('white_05');
    const black_06 = document.getElementById('black_06');
    const white_06 = document.getElementById('white_06');

    if (body.classList.contains('dark-mode')) {
        facebookW.style.display = 'block';
        facebookD.style.display = 'none';
        youtubeW.style.display = 'block';
        youtubeD.style.display = 'none';
        black_01.style.display = 'block';
        white_01.style.display = 'none';
        black_02.style.display = 'block';
        white_02.style.display = 'none';
        black_03.style.display = 'block';
        white_03.style.display = 'none';
        black_04.style.display = 'block';
        white_04.style.display = 'none';
        black_05.style.display = 'block';
        white_05.style.display = 'none';
        black_06.style.display = 'block';
        white_06.style.display = 'none';
    } else {
        facebookW.style.display = 'none';
        facebookD.style.display = 'block';
        youtubeW.style.display = 'none';
        youtubeD.style.display = 'block';
        black_01.style.display = 'none';
        white_01.style.display = 'block';
        black_02.style.display = 'none';
        white_02.style.display = 'block';
        black_03.style.display = 'none';
        white_03.style.display = 'block';
        black_04.style.display = 'none';
        white_04.style.display = 'block';
        black_05.style.display = 'none';
        white_05.style.display = 'block';
        black_06.style.display = 'none';
        white_06.style.display = 'block';
    }
}



//Input Focus entfernen
document.addEventListener("click", (event) => {
  const input = document.getElementById("textInput");

  // Prüfen, ob das geklickte Element NICHT das Input-Feld ist
  if (event.target !== input) {
      input.blur(); // Fokus entfernen
  }
});




//BOX 4 BILDER
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".box4 img");
    images.forEach(img => {
        img.style.boxShadow = "inset 0 0 10px rgba(255, 255, 255, 1)";
    });
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





//Links
document.addEventListener("click", (event) => {
  const target = event.target; // Angeclicktes Element
  if (target.classList.contains("case")) {
      const url = target.getAttribute("data-link"); // Link aus dem Attribut
      if (url) {
          window.open(url, "_self"); // Öffnet Link in neuem Tab
      }
  }
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
  if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "textarea") {
    return; // Verhindert, dass der Scroll-Mechanismus bei Input-Feldern greift
  }
  
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





//COOKIE BANNER
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.accept');
    const rejectBtn = document.querySelector('.reject');
    const settingsBtn = document.querySelector('.settings');
    const closeBtn = document.querySelector('.close-cookie');

    // Zeige Banner nach kurzer Verzögerung
    setTimeout(() => {
        if (!getCookie('cookieConsent')) {
            cookieBanner.style.display = 'block';
        }
    }, 2000);

    // Schließen Button
    closeBtn.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
    });

    // Akzeptieren Button
    acceptBtn.addEventListener('click', () => {
        setCookie('cookieConsent', 'accepted', 365);
        cookieBanner.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500);
    });

    // Ablehnen Button
    rejectBtn.addEventListener('click', () => {
        setCookie('cookieConsent', 'rejected', 365);
        cookieBanner.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500);
    });

    // Einstellungen Button
    settingsBtn.addEventListener('click', () => {
        // Hier können Sie später die Cookie-Einstellungen implementieren
        alert('Cookie-Einstellungen werden in Kürze verfügbar sein.');
    });
});

// Cookie Helper Funktionen
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
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




// Image Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    let currentSlide = 0;
    let startX;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Initialize
    function init() {
        // Add event listeners
        slider.addEventListener('mousedown', dragStart);
        slider.addEventListener('touchstart', dragStart);
        slider.addEventListener('mousemove', drag);
        slider.addEventListener('touchmove', drag);
        slider.addEventListener('mouseup', dragEnd);
        slider.addEventListener('touchend', dragEnd);
        slider.addEventListener('mouseleave', dragEnd);

        // Navigation buttons
        prevBtn.addEventListener('click', () => moveToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => moveToSlide(currentSlide + 1));

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => moveToSlide(index));
        });

        // Prevent context menu
        slider.addEventListener('contextmenu', e => e.preventDefault());

        // Set initial position
        updateSliderPosition();
    }

    function dragStart(e) {
        e.preventDefault();
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
        } else {
            startX = e.clientX;
        }
        isDragging = true;
        slider.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;

        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        const walk = diff;

        currentTranslate = prevTranslate + walk;
        updateSliderPosition();
    }

    function dragEnd() {
        isDragging = false;
        slider.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        
        if (Math.abs(movedBy) > slider.clientWidth / 3) {
            if (movedBy < 0 && currentSlide < slides.length - 1) {
                currentSlide++;
            } else if (movedBy > 0 && currentSlide > 0) {
                currentSlide--;
            }
        }

        moveToSlide(currentSlide);
    }

    function moveToSlide(index) {
        // Handle bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentSlide = index;
        currentTranslate = -index * slider.clientWidth;
        prevTranslate = currentTranslate;

        updateSliderPosition();
        updateDots();
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentTranslate = -currentSlide * slider.clientWidth;
            prevTranslate = currentTranslate;
            updateSliderPosition();
        }, 250);
    });

    // Initialize slider
    init();
});


