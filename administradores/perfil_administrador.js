// Traer el usuario logueado desde localStorage y parsear el JSON para convertirlo en un objeto JavaScript
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Verificar si el usuario está logueado
if (loggedInUser) {
  // Si el usuario está logueado, llenar el formulario con los datos del usuario logueado
  document.querySelector("#nombres").value = loggedInUser.nombres;        // Llenar el campo "nombres"
  document.querySelector("#apellidos").value = loggedInUser.apellidos;    // Llenar el campo "apellidos"
  document.querySelector("#correo").value = loggedInUser.correo;          // Llenar el campo "correo"
  document.querySelector("#telefono").value = loggedInUser.telefono;      // Llenar el campo "telefono"
  document.querySelector("#direccion").value = loggedInUser.direccion;    // Llenar el campo "direccion"
  document.querySelector("#descripcion").value = loggedInUser.descripcion; // Llenar el campo "descripcion"
  document.querySelector("#loggedInUserName").innerText =
  loggedInUser.nombres + " " + loggedInUser.apellidos;                  // Mostrar el nombre completo del usuario logueado en la interfaz
}

// Agregar un evento de clic al botón de actualización
document.querySelector("#actualizar").addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir la acción predeterminada del formulario, que es recargar la página

    // Crear un objeto con los datos actualizados del usuario a partir de los valores del formulario
    const updatedUser = {
      nombres: document.querySelector("#nombres").value,         // Obtener el valor actualizado del campo "nombres"
      apellidos: document.querySelector("#apellidos").value,     // Obtener el valor actualizado del campo "apellidos"
      correo: document.querySelector("#correo").value,           // Obtener el valor actualizado del campo "correo"
      telefono: document.querySelector("#telefono").value,       // Obtener el valor actualizado del campo "telefono"
      direccion: document.querySelector("#direccion").value,     // Obtener el valor actualizado del campo "direccion"
      descripcion: document.querySelector("#descripcion").value, // Obtener el valor actualizado del campo "descripcion"
    };

    // Guardar los datos actualizados del usuario en localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Obtener la lista de todos los usuarios desde localStorage y parsearla
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el índice del usuario logueado en la lista de usuarios mediante su correo electrónico
    const index = users.findIndex(
      (user) => user.correo === updatedUser.correo
    );

    // Si se encuentra el usuario en la lista de usuarios, actualizar sus datos
    if (index !== -1) {
      users[index] = updatedUser; // Reemplazar los datos antiguos del usuario con los nuevos datos
      localStorage.setItem("users", JSON.stringify(users)); // Guardar la lista actualizada de usuarios en localStorage
    }

    // Mostrar un mensaje de éxito al usuario
    alert("Perfil actualizado con éxito");

    // Recargar la página para reflejar los cambios
    location.reload();
});

// Seleccionar los elementos del DOM relacionados con la funcionalidad de cerrar sesión y el menú de perfil
const salir = document.querySelector('.img-salir');      // Seleccionar el icono de salir
const menu = document.querySelector('.menu_perfil');     // Seleccionar el menú de perfil
const desplegable = document.querySelector('.desplegable'); // Seleccionar el elemento desplegable del menú

// Agregar un evento de clic al elemento desplegable para mostrar el menú de perfil
desplegable.addEventListener('click', () => {
    menu.classList.add('estilos'); // Añadir la clase 'estilos' al menú de perfil para mostrarlo
});

// Agregar un evento de clic al icono de salir para ocultar el menú de perfil
salir.addEventListener('click', () => {
    menu.style.display = 'none'; // Ocultar el menú de perfil estableciendo su display a 'none'
});


// - findIndex: Encuentra el índice del primer elemento en un array que cumple con una condición dada.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.