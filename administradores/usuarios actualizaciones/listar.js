// IMPORTANCIONES
import { solicitud_usuarios } from "../../modulos/solicitud.js";

// Seleccionar el tbody en el que agregar las filas
const tbody = document.querySelector('tbody');

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

// LISTAR LOS USUARIOS
const listarUsuarios = async () => {
    try {
        // Obtener los datos de usuarios
        const data = await solicitud_usuarios();

        // Vaciar el tbody
        tbody.innerHTML = '';

        // Procesar cada usuario y llenar el template
        data.forEach((element) => {
            // Llenar los datos del usuario en el template clonado
            $template.querySelector('.nombres').textContent = element.nombres || '';
            $template.querySelector('.apellidos').textContent = element.apellidos || '';
            $template.querySelector('.correo').textContent = element.correo || '';
            $template.querySelector('.teléfono').textContent = element.telefono || '';
            $template.querySelector('.dirección').textContent = element.direccion || '';
            $template.querySelector('.descripción').textContent = element.descripcion || '';
            $template.querySelector('.rol').textContent = element.rol || '';
            $template.querySelector('.estado-cuenta').textContent = element.estado_cuenta || '';

            // Agregar enlaces de edición y eliminación
            $template.querySelector('.edit-user').setAttribute('href', `actualizar.html?id=${element.id}`);

            // Clonar el contenido del template para usarlo
            const clone = document.importNode($template, true);

            // Agregar el clone al fragmento
            $fragmento.appendChild(clone);
        });

        // Agregar el fragmento al tbody
        tbody.appendChild($fragmento);

    } catch (error) {
        console.error('Error al listar usuarios:', error);
    }
};

// Ejecutar la función para listar usuarios al cargar el script
listarUsuarios();

// Obtener el nombre completo del usuario almacenado en localStorage
const userName = localStorage.getItem('userName');
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