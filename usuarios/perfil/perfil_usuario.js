// IMPORTANCIONES
import solicitud, { enviar } from "../../modulos/solicitud.js";

// IMPORTACIONES
import remover from "../../modulos/modulo_remover.js";// Importa el módulo para eliminar mensajes de error o clases de los campos.
import solonumeros from "../../modulos/modulo_solonumeros.js"; // Importa la función que permite solo números en un campo.
import validarDescripcion from "../../modulos/modulo_descripcion.js"; // Importa la función que valida la descripción.

// VARIABLES
const telefono = document.querySelector('#telefono'); // Campo de entrada para el teléfono
const direccion = document.querySelector('#direccion'); // Campo de entrada para la dirección
const descripcion = document.querySelector('#descripcion'); // Campo de entrada para la descripción

// Deshabilitar estado de cuenta, rol, contraseña, confirmarcontraseña
// Se asegura de que el contenido del documento HTML esté completamente cargado antes de ejecutar el código dentro de la función.
document.addEventListener("DOMContentLoaded", function() {

  // Deshabilita el campo de entrada con el id 'nombre_usuarios' para que no se pueda editar.
  document.querySelector("#nombres").disabled = true;

  // Deshabilita el campo de entrada con el id 'apellido_usuarios' para que no se pueda editar.
  document.querySelector("#apellidos").disabled = true;

  // Deshabilita el campo de entrada con el id 'id_rol_usuarios_fk' para que no se pueda editar (clave foránea para el rol del usuario).
  document.querySelector("#rol").disabled = true;

  // Deshabilita el campo de entrada con el id 'estado_cuenta_usuarios' para que no se pueda editar (probablemente el estado activo/inactivo de la cuenta del usuario).
  document.querySelector("#estado_cuenta").disabled = true;

  // Deshabilita el campo de entrada con el id 'correo_elec_usuarios' para que no se pueda editar (correo electrónico del usuario).
  document.querySelector("#correo").disabled = true;
});

// Variable para almacenar el ID del usuario logueado
let loggedInUserId = null;

// Función para llenar el formulario con los datos del usuario logueado
const cargarPerfil = async () => {
  try {
    // Obtener la lista de usuarios desde el servidor
    const users = await solicitud("users");

    // Suponiendo que guardaste el correo del usuario logueado en el localStorage
    const loggedInUserCorreo = localStorage.getItem('correoLogueado'); // Cambia esto por el método que uses para obtener el correo

    if (!loggedInUserCorreo) {
      console.error('No hay un correo almacenado en el localStorage para el usuario logueado.');
      return;
    }

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
      document.querySelector("#descripcion").value = loggedInUser.descripcion || '';
      document.querySelector("#rol").value = loggedInUser.rol || '';
      document.querySelector("#estado_cuenta").value = loggedInUser.estado_cuenta || '';
      document.querySelector("#contraseña").value = loggedInUser.contraseña || '';
      document.querySelector("#confirmarContraseña").value = loggedInUser.confirmarContraseña || '';

      // Mostrar el nombre completo y el rol del usuario en la interfaz
      document.querySelector("#loggedInUserNamecliente").innerHTML = `
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

// Función para validar los campos requeridos
function validateFields() {
  let valid = true;
  const inputs = [telefono, direccion, descripcion];

  inputs.forEach(input => {
      if (input.value.trim() === '') {
          valid = false;
          input.classList.add('error'); // Agrega clase de error si está vacío
      } else {
          input.classList.remove('error'); // Remueve clase de error si está lleno
      }
  });

  return valid;
}

// Agregar un evento de clic al botón de actualización
document.querySelector(".boton__actualizar-link").addEventListener("click", async (event) => {
  event.preventDefault();

   // Validar campos
   let response = validateFields();

   // Si la validación falla
   if (!response) {
     event.preventDefault();
     alert("Por favor, corrige los campos con errores.");
     window.location.href = "../../../errores/error1.html";
     return;  // Detenemos el envío del formulario
   }
  
  // Crear un objeto con los datos del usuario a partir de los valores del formulario, incluidos los campos deshabilitados
  const updatedUser = {
    nombres: document.querySelector("#nombres").value,
    apellidos: document.querySelector("#apellidos").value,
    correo: document.querySelector("#correo").value,
    telefono: document.querySelector("#telefono").value,
    direccion: document.querySelector("#direccion").value,
    descripcion: document.querySelector("#descripcion").value,
    rol: document.querySelector("#rol").value,
    estado_cuenta: document.querySelector("#estado_cuenta").value,
    contraseña: document.querySelector("#contraseña").value,
    confirmarContraseña: document.querySelector("#confirmarContraseña").value
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

// Función para actualizar el contador del carrito en la interfaz
async function actualizarContadorCarrito() {
  try {
      // Obtener el userId desde localStorage
      const userId = localStorage.getItem('userId');

      // Obtener los productos actuales en el carrito para ese usuario
      const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
      const carrito = await response.json();

      // Contar el número total de productos en el carrito
      const totalProductos = carrito.length; // Contar la cantidad de productos en el carrito

      // Actualizar el contador en el HTML
      document.querySelector("#cuenta_carrito").textContent = totalProductos;
  } catch (error) {
      console.error("Error al actualizar el contador del carrito:", error);
  }
}

// Llama a la función para actualizar el contador del carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

// EVENTOS DE VALIDACIÓN EN TIEMPO REAL
[telefono, direccion, descripcion].forEach(input => {
  input.addEventListener("blur", () => {
      remover(input); // Llama a la función 'remover' para quitar mensajes de error
  });
});

// Validación del teléfono
telefono.addEventListener("keypress", (event) => {
  solonumeros(event, telefono); // Permitir solo números
});

// Validación de la descripción
descripcion.addEventListener("blur", (event) => {
  validarDescripcion(event, descripcion); // Validar la descripción
});