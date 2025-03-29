document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            const product = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price),
                quantity: 1
            };

            // Überprüfen, ob Produkt schon im Warenkorb ist
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} wurde zum Warenkorb hinzugefügt!`);
        });
    });
});









document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        totalPriceElement.style.display = "none";
        return;
    }

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


// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach((anchor) => {
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
