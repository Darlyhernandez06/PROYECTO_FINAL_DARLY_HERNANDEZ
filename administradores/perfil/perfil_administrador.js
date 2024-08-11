import { solicitud_usuarios } from "../../modulos/solicitud.js";

// Función para llenar el formulario con los datos del usuario logueado
const cargarPerfil = async () => {
  try {
    // Obtener la lista de usuarios desde el servidor
    const users = await solicitud_usuarios("users");
    // Traer el usuario logueado desde localStorage y parsear el JSON para convertirlo en un objeto JavaScript
    const loggedInUser = users.find((user) => user.correo === localStorage.getItem("loggedInUser"));
    // Verificar si el usuario está logueado
    if (loggedInUser) {
      // Si el usuario está logueado, llenar el formulario con los datos del usuario logueado
      document.querySelector("#nombres").value = loggedInUser.nombres || '';
      document.querySelector("#apellidos").value = loggedInUser.apellidos || '';
      document.querySelector("#correo").value = loggedInUser.correo || '';
      document.querySelector("#telefono").value = loggedInUser.telefono || '';
      document.querySelector("#direccion").value = loggedInUser.direccion || '';
      document.querySelector("#descripcion").value = loggedInUser.descripcion || '';
      document.querySelector("#loggedInUserName").innerText = (loggedInUser.nombres || '') + " " + (loggedInUser.apellidos || '');
    } else {
      console.error('No hay un usuario logueado.');
    }
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
  }
};

// Agregar un evento de clic al botón de actualización
document.querySelector(".boton__actualizar-link").addEventListener("click", async (event) => {
  event.preventDefault();
  // Crear un objeto con los datos actualizados del usuario a partir de los valores del formulario
  const updatedUser = {
    nombres: document.querySelector("#nombres").value,
    apellidos: document.querySelector("#apellidos").value,
    correo: document.querySelector("#correo").value,
    telefono: document.querySelector("#telefono").value,
    direccion: document.querySelector("#direccion").value,
    descripcion: document.querySelector("#descripcion").value,
  };
  try {
    // Enviar los datos actualizados al servidor
    await solicitud_usuarios("updateUser", updatedUser);
    // Actualizar el usuario logueado en localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    // Obtener la lista de todos los usuarios desde el servidor
    const users = await solicitud_usuarios("users");
    // Buscar el índice del usuario logueado en la lista de usuarios mediante su correo electrónico
    const index = users.findIndex((user) => user.correo === updatedUser.correo);
    // Si se encuentra el usuario en la lista de usuarios, actualizar sus datos
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    // Mostrar un mensaje de éxito al usuario
    alert("Perfil actualizado con éxito");
    // Actualizar la interfaz sin recargar la página
    document.querySelector("#loggedInUserName").innerText = (updatedUser.nombres || '') + " " + (updatedUser.apellidos || '');
    // Llamar a la función para recargar la lista de usuarios si es necesario
    // listarUsuarios(); // Asegúrate de definir esta función en tu código
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    alert('Hubo un problema al actualizar el perfil. Inténtalo de nuevo.');
  }
});

// Llamar a la función para cargar el perfil al cargar el script
cargarPerfil();

// Obtener el nombre completo del usuario almacenado en localStorage
const userName = localStorage.getItem('userName');

// Obtener el tipo de usuario almacenado en localStorage (por ejemplo, Administrador o Cliente)
const userType = localStorage.getItem('userType');

// Verificar si hay un nombre de usuario almacenado en localStorage
if (userName) {
    // Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
    // Mostrar el nombre completo en negrita y el tipo de usuario en una línea separada
    document.querySelector('#loggedInUserName').innerHTML = `
        <strong>${userName}</strong><br>
        <small>${userType}</small>
    `;
}

// Obtener los elementos para la gestión del menú de perfil
const salir = document.querySelector('.img-salir'); // Botón para salir
const menu = document.querySelector('.menu_perfil'); // Menú de perfil
const desplegable = document.querySelector('.desplegable'); // Botón para desplegar el menú

// Mostrar el menú de perfil cuando se hace clic en el botón desplegable
desplegable.addEventListener('click', () => {
    menu.classList.add('estilos'); // Agregar una clase que muestra el menú
});

// Ocultar el menú de perfil cuando se hace clic en el botón salir
salir.addEventListener('click', () => {
    menu.style.display = 'none'; // Ocultar el menú cambiando su estilo
});


// - findIndex: Encuentra el índice del primer elemento en un array que cumple con una condición dada.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.