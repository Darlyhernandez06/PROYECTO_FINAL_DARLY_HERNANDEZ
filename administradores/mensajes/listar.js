// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Variables
const tbody = document.querySelector("tbody");

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

// Listar mensajes
const listarMensajes = async () => {
    try {
        // Obtener los datos de mensajes
        const data = await solicitud("mensajes");

        // Verificar si `data` es un array
        if (Array.isArray(data)) {
            // Iterar sobre los mensajes y crear filas en la tabla
            data.forEach(mensaje => {
                // Clonar el template
                const clone = document.importNode($template, true);

                // Asignar los valores del mensaje a las celdas
                clone.querySelector(".id").textContent = mensaje.id;
                clone.querySelector(".nombre").textContent = mensaje.nombres;
                clone.querySelector(".correo").textContent = mensaje.correo;
                clone.querySelector(".telefono").textContent = mensaje.telefono;
                clone.querySelector(".mensaje").textContent = mensaje.descripcion;

                // Agregar la fila clonada al fragmento
                $fragmento.appendChild(clone);
            });

            // Agregar todas las filas al tbody
            tbody.appendChild($fragmento);
        } else {
            console.error('No se encontraron mensajes o la estructura es incorrecta:', data);
        }

    } catch (error) {
        console.error('Error al listar mensajes:', error);
    }
};

// Llamar a la función para listar los mensajes al cargar el script
listarMensajes();

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
    menu.classList.remove('estilos'); // Quitar la clase que muestra el menú
});

// Evento para el filtro de búsqueda
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) {
        // Si se presiona "Escape", limpiar el campo de búsqueda
        if (e.key === "Escape") {
            e.target.value = "";
            // Volver a mostrar todos los productos si el campo de búsqueda está vacío
            document.querySelectorAll("tr").forEach((mensaje) => {
                mensaje.classList.remove("filtro");
            });
        } else {
            // Filtrar productos según el texto de búsqueda
            const searchValue = e.target.value.toLowerCase();
            document.querySelectorAll("tr").forEach((mensaje) => {
                // Comprueba si el texto del producto incluye el valor de búsqueda
                mensaje.textContent.toLowerCase().includes(searchValue)
                    ? mensaje.classList.remove("filtro") // Muestra el producto si coincide
                    : mensaje.classList.add("filtro"); // Oculta el producto si no coincide
            });
        }
    }
});