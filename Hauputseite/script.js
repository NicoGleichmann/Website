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



//ANIMATION
const boxes = document.querySelectorAll('.box, .case, .email-box, .lite, .box_top, .full_width, .post-container');

boxes.forEach(box => {
  box.addEventListener('mouseover', () => {
    box.style.transform = 'scale(1.1)';
    box.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  });

  box.addEventListener('mouseout', () => {
    box.style.transform = 'scale(1)';
    box.style.boxShadow = 'none';
  });
});








