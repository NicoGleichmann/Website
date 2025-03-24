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



