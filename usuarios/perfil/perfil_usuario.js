// Importa la función solicitud_usuarios desde un módulo para hacer solicitudes al servidor
import { solicitud_usuarios } from "../../modulos/solicitud.js";

// Deshabilitar estado de cuenta, rol, contraseña, confirmarcontraseña
document.querySelector("#contraseña").disabled = true;
document.querySelector("#confirmarContraseña").disabled = true;
document.querySelector("#estado_cuenta").disabled = true;
document.querySelector("#rol").disabled = true;

// Variable para almacenar el ID del usuario logueado
let loggedInUserId = null;

// Función para llenar el formulario con los datos del usuario logueado
const cargarPerfil = async () => {
  try {
    // Obtener la lista de usuarios desde el servidor
    const users = await solicitud_usuarios("users");

    // Traer el correo electrónico del usuario logueado desde la lista de usuarios
    const loggedInUserCorreo = users.find(user => user.rol === 'Cliente').correo;

    // Verificar si se obtuvo el correo electrónico del usuario logueado
    if (!loggedInUserCorreo) {
      console.error('No hay un correo almacenado en el JSON para el usuario logueado.');
      return;
    }

    // Buscar el usuario logueado en la lista de usuarios usando el correo electrónico
    const loggedInUser = users.find((user) => user.correo === loggedInUserCorreo);

    // Verificar si el usuario logueado fue encontrado
    if (loggedInUser) {
      // Almacenar el ID del usuario logueado para usarlo en la actualización
      loggedInUserId = loggedInUser.id;

      // Llenar el formulario con los datos del usuario logueado
      document.querySelector("#nombres").value = loggedInUser.nombres || '';
      document.querySelector("#apellidos").value = loggedInUser.apellidos || '';
      document.querySelector("#correo").value = loggedInUser.correo || '';
      document.querySelector("#telefono").value = loggedInUser.telefono || '';
      document.querySelector("#direccion").value = loggedInUser.direccion || '';
      document.querySelector("#contraseña").value = loggedInUser.contraseña || '';
      document.querySelector("#confirmarContraseña").value = loggedInUser.confirmarContraseña || '';
      document.querySelector("#descripcion").value = loggedInUser.descripcion || '';
      document.querySelector("#rol").value = loggedInUser.rol || '';
      document.querySelector("#estado_cuenta").value = loggedInUser.estado_cuenta || '';

      // Mostrar el nombre completo y el rol del usuario en la interfaz
      document.querySelector("#loggedInUserName").innerHTML = `
        <strong>${loggedInUser.nombres || ''} ${loggedInUser.apellidos || ''}</strong><br>
        <small>${loggedInUser.rol || ''}</small>
      `;
    } else {
      console.error('No hay un usuario logueado con el correo:', loggedInUserCorreo);
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
    contraseña: document.querySelector("#contraseña").value,
    confirmarContraseña: document.querySelector("#confirmarContraseña").value,
    descripcion: document.querySelector("#descripcion").value,
    rol: document.querySelector("#rol").value,
    estado_cuenta: document.querySelector("#estado_cuenta").value,
  };

  try {
    // Verificar si el ID del usuario está disponible antes de enviar la actualización
    if (!loggedInUserId) {
      console.error('ID del usuario no disponible.');
      return;
    }

    // Enviar los datos actualizados al servidor usando el método PUT
    const response = await fetch(`http://localhost:3000/users/${loggedInUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    
    // Verificar si la solicitud fue exitosa
    if (response.ok) {
      // Actualizar la interfaz con los datos del usuario actualizado
      document.querySelector("#loggedInUserName").innerHTML = `
        <strong>${updatedUser.nombres || ''} ${updatedUser.apellidos || ''}</strong><br>
        <small>${updatedUser.rol || ''}</small>
      `;
      
      // Mostrar un mensaje de éxito al usuario
      alert("Perfil actualizado con éxito");
    } else {
      console.error('Error al actualizar el perfil:', response);
      alert('Hubo un problema al actualizar el perfil. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    alert('Hubo un problema al actualizar el perfil. Inténtalo de nuevo.');
  }
});

// Llamar a la función para cargar el perfil cuando se carga el script
cargarPerfil();

// Obtener el nombre completo y el tipo de usuario del almacenamiento local
const userName = localStorage.getItem('userName');
const userType = localStorage.getItem('userType');

// Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
if (userName) {
    document.querySelector('#loggedInUserNamecliente').innerHTML = `
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