// Alternar entre login y registro (si aplica)
const formContainer = document.getElementById('formContainer');
function toggleForm() {
  if (formContainer.classList.contains('login-active')) {
    formContainer.classList.remove('login-active');
    formContainer.classList.add('register-active');
  } else {
    formContainer.classList.remove('register-active');
    formContainer.classList.add('login-active');
  }
}
// Mostrar el formulario de login por defecto
formContainer.classList.add('login-active');

// Función para verificar la sesión del usuario
async function checkUserSession() {
  try {
    console.log("Verificando sesión...");
    const response = await fetch('/current-user');
    if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
    }
    const data = await response.json();
    console.log("Datos recibidos:", data);
    if (data.loggedIn === true) {
      // Si hay sesión, ocultamos el formulario y mostramos el perfil
      document.getElementById('container').style.display = 'none';
      document.getElementById('perfil').style.display = 'block';
      // Actualizamos el nombre de usuario
      document.getElementById('nombreUsuario').textContent = data.usuario;
    } else {
      // No hay sesión: mostramos formulario, ocultamos perfil
      document.getElementById('container').style.display = 'block';
      document.getElementById('perfil').style.display = 'none';
    }
  } catch (error) {
    console.error("Error al verificar la sesión:", error);
    document.getElementById('container').style.display = 'block';
    document.getElementById('perfil').style.display = 'none';
  }
}

// Ejecutar la comprobación cuando la página carga
window.addEventListener("load", checkUserSession);