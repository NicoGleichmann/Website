document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Leerer Warenkorb
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        totalPriceElement.style.display = "none";
        return;
    }

    // Warenkorb-Inhalt
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.quantity * item.price;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - ${item.quantity}x - ${item.price.toFixed(2)}€</p>
            <button class="remove-item" data-id="${item.id}">❌</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceElement.textContent = `Insgesamt: ${totalPrice.toFixed(2)}€`;

    // Entfernen-Funktion
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            const itemId = event.target.dataset.id;
            const updatedCart = cart.filter(item => item.id !== itemId);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            location.reload();
        });
    });

    // Weiter zur Kasse
    document.getElementById("checkout-btn").addEventListener("click", () => {
        window.location.href = "/business/einkaufswagen/checkout/checkout.html";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // MODAL für Geschichte
    let modal = document.getElementById("historyModal");
    let historyBtn = document.getElementById("historyButton"); // Bestehender Button
    let closeModal = document.querySelector(".close");

    if (historyBtn) {
        historyBtn.onclick = function () {
            modal.style.display = "flex";
        };
    }

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // WARENKORB Sidebar
    let cartSidebar = document.getElementById("cartSidebar");
    let cartButton = document.getElementById("cartButton"); // Bestehender Button
    let closeCart = document.querySelector(".close-cart");

    if (cartButton) {
        cartButton.onclick = function () {
            cartSidebar.classList.add("open");
        };
    }

    closeCart.onclick = function () {
        cartSidebar.classList.remove("open");
    };
});



// Optional: Kleine Animation beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".container");
    content.style.opacity = "0";
    content.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        content.style.transition = "0.8s";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
    }, 200);
});



// Dark Mode
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


// Scroll Animation nach unten 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a, footer .footer-container .footer-links .footer-column ul li a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            // Prüfen, ob der Link auf eine ID zeigt
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault(); // Standard-Link-Verhalten verhindern

                const targetId = this.getAttribute("href").substring(1); // ID extrahieren
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // 80px Abstand für Header
                        behavior: "smooth", // Smooth Scroll Effekt
                    });
                }
            }
        });
    });
});



// Interaktive Auswahl
// Smooth Scroll zu den Kategorien
document.getElementById("light").addEventListener("click", function() {
    document.getElementById("light-section").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("energy").addEventListener("click", function() {
    document.getElementById("energy-section").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("glow").addEventListener("click", function() {
    document.getElementById("glow-section").scrollIntoView({ behavior: "smooth" });
});


document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".filter-buttons button");
    const products = document.querySelectorAll(".product-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Setzt den aktiven Button
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Zeigt/versteckt Produkte basierend auf der Auswahl
            products.forEach(product => {
                if (filter === "all" || product.getAttribute("data-category") === filter) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
});


// Pop-up-Funktion
document.addEventListener("DOMContentLoaded", function () {
    // Funktion für das Pop-up
    function showPopup(message) {
        let popup = document.createElement("div");
        popup.classList.add("popup-message");
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("show");
        }, 100); // Leichte Verzögerung für den Effekt

        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 500); // Entfernt das Element nach der Animation
        }, 3000);
    }

    // === Interaktive Buttons ===
    document.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            let faction = this.textContent.trim();
            showPopup(`Willkommen – du bist jetzt im Team ${faction}!`);
        });
    });

    document.querySelectorAll(".buy-button").forEach((btn) => {
        btn.addEventListener("click", function () {
            showPopup("✅ Produkt wurde zum Einkaufswagen hinzugefügt!");
        });
    });
});
