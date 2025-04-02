document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalPrice = document.getElementById("total-price");

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart">🛒 Dein Warenkorb ist leer.</p>`;
            totalPrice.innerHTML = `Insgesamt: 0.00€`;
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price.toFixed(2)}€</p>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        totalPrice.innerHTML = `Insgesamt: ${total.toFixed(2)}€`;

        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCartUI();
            });
        });
    }

    document.querySelectorAll(".buy-button").forEach((btn) => {
        btn.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let productName = productCard.querySelector("h3").textContent;
            let productPrice = parseFloat(productCard.querySelector("span").textContent.replace("€", ""));
            let productImage = productCard.querySelector("/img/d01.jpg").src;

            cart.push({ name: productName, price: productPrice });
            saveCart();
            updateCartUI();

            showPopup(productName, productPrice, productImage);
        });
    });

    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            showNotification("❌ Dein Warenkorb ist leer!");
        } else {
            showNotification("✅ Du wirst zur Kasse weitergeleitet...");
            setTimeout(() => {
                window.location.href = "/checkout";
            }, 2000);
        }
    });

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function showPopup(name, price, image) {
        const popupOverlay = document.getElementById("popup-overlay");
        const popupContent = document.getElementById("popup-content");

        popupContent.innerHTML = `
            <div class="popup-header">
                <span class="close-btn">&times;</span>
            </div>
            <div class="popup-body">
                <img src="${image}" alt="${name}">
                <div class="popup-info">
                    <h3>${name}</h3>
                    <p>${price.toFixed(2)}€</p>
                    <button id="go-to-cart">Zum Warenkorb</button>
                </div>
            </div>
        `;

        popupOverlay.style.display = "flex";

        document.querySelector(".close-btn").addEventListener("click", function () {
            popupOverlay.style.display = "none";
        });

        document.getElementById("go-to-cart").addEventListener("click", function () {
            window.location.href = "/cart";
        });
    }

    function showNotification(message) {
        const popup = document.createElement("div");
        popup.classList.add("popup-message");
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("fade-out");
            setTimeout(() => popup.remove(), 500);
        }, 2000);
    }

    if (document.getElementById("cart-items")) {
        updateCartUI();
    }
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
