// Simulación de usuario logeado
let userLoggedIn = false; // Cambia a `true` si el usuario está logeado

// Cargar la sección de usuario
function loadUserSection() {
  const userSection = document.getElementById("user-section");

  if (userLoggedIn) {
    // Mostrar foto de perfil predeterminada
    userSection.innerHTML = `
      <img src="default-profile.png" alt="Foto de perfil" id="profile-pic" style="height: 50px; cursor: pointer;">
    `;
    document.getElementById("profile-pic").addEventListener("click", redirectToProfile);
  } else {
    // Mostrar botón de login
    userSection.innerHTML = `
      <button onclick="redirectToLogin()">Login</button>
    `;
  }
}

// Redirigir al perfil del usuario
function redirectToProfile() {
  if (userLoggedIn) {
    window.location.href = "profile.html";
  }
}

// Redirigir al login
function redirectToLogin() {
  window.location.href = "login.html";
}

// Cargar la sección de usuario al iniciar
document.addEventListener("DOMContentLoaded", loadUserSection);