const passwordField = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.src = "/img/visibility_off.png"; // Bild ändern
    } else {
        passwordField.type = "password";
        togglePassword.src = "/img/visibility.png"; // Zurück wechseln
    }
});

