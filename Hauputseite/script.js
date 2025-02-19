const themeButton = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = true;

// Theme Toggle
themeButton.addEventListener('click', () => {
    if (isDarkMode) {
        themeButton.textContent = '☀️';
    } else {
        themeButton.textContent = '🌙';
    }
    isDarkMode = !isDarkMode;
});


//Input Focus entfernen
document.addEventListener("click", (event) => {
  const input = document.getElementById("textInput");

  // Prüfen, ob das geklickte Element NICHT das Input-Feld ist
  if (event.target !== input) {
      input.blur(); // Fokus entfernen
  }
});





//Insta Box








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
          window.open(url, "_blank"); // Öffnet Link in neuem Tab
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


//ANIMATION

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("div, button, a, input, textarea");
  
  // Hover-Effekt hinzufügen
  elements.forEach(el => {
      el.style.transition = "all 0.3s ease";
      
      el.addEventListener("mouseenter", () => {
          el.style.transform = "translateY(-5px)";
          el.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      });
      
      el.addEventListener("mouseleave", () => {
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
      });
  });

  // Slide-In-Animation beim Laden der Seite
  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".slide-in");
    
    elements.forEach((el, index) => {
        const directions = ["translateX(-50px)", "translateX(50px)", "translateY(-50px)", "translateY(50px)"];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        el.style.opacity = "0";
        el.style.transform = randomDirection;
        el.style.transition = `opacity 0.8s ease-out ${(index * 0.1).toFixed(2)}s, transform 0.8s ease-out ${(index * 0.1).toFixed(2)}s`;
    });
    
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0) translateY(0)";
        });
    }, 100);
  });});

// Minimalistische Hover-Effekte für alle wichtigen Elemente
document.querySelectorAll("div, button, a, input, textarea").forEach(el => {
    el.style.transition = "all 0.3s ease";
    
    el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.03)";
        el.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
    
    el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.boxShadow = "none";
    });
});







//COOKIE BANNER

// Cookie Banner Funktionen
const cookieBanner = document.getElementById("cookie-banner");
if (!getCookie('cookiesAccepted')) {
    cookieBanner.style.display = 'block';
}

document.getElementById("accept-cookies").addEventListener("click", function() {
    setCookie("cookiesAccepted", "true", 365);
    cookieBanner.style.display = 'none';
});

document.getElementById("reject-cookies").addEventListener("click", function() {
    cookieBanner.style.display = 'none';
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

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