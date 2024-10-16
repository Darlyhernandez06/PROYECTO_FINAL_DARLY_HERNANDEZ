// IMPORTANCIONES
import solicitud, { enviar } from "../../modulos/solicitud.js";

// Seleccionar el tbody en el que se agregarán las filas de usuarios
const tbody = document.querySelector('tbody'); // Se obtiene la referencia al elemento <tbody> del documento HTML para agregar las filas de usuarios.

 // TEMPLATE: Obtener el template y su contenido desde el DOM
const $template = document.querySelector("#template").content; // Se selecciona el elemento <template> con ID "template" y se accede a su contenido.

 // FRAGMENTOS: Crear un fragmento de documento para optimizar la manipulación del DOM
const $fragmento = document.createDocumentFragment(); // Se crea un fragmento de documento para mejorar la eficiencia al agregar múltiples nodos al DOM.

 // LISTAR LOS USUARIOS CON ROL DE CLIENTE
const listarUsuarios = async (page) => { // Se define una función asíncrona que recibe un parámetro 'page'.
    const _page = page ? page : 1; // Se asigna el valor de 'page' si está definido, de lo contrario se asigna 1.

    try {
        // Obtener los datos de usuarios de la API, con paginación
        const data = await solicitud(`users?_page=${_page}&_per_page=4`); // Se realiza una solicitud a la API para obtener usuarios, especificando la página y el número de usuarios por página.

        console.log(data); // Se imprime la respuesta para verificar su estructura.

        // Manejo con los botones de navegación
        const nav = document.querySelector(".navegacion"); // Se selecciona el elemento de navegación en el DOM.

        // Carga los datos de paginación que trae la API
        const first = data.first; // Obtiene el número de la primera página desde la respuesta de la API.
        const prev = data.prev; // Obtiene el número de la página anterior.
        const next = data.next; // Obtiene el número de la siguiente página.
        const last = data.last; // Obtiene el número de la última página.

        // Imprime los números de página para depuración.
        console.log(`first: ${first}, prev: ${prev}, next: ${next}, last: ${last}`); 

        // Habilitar/deshabilitar botones según la página actual
        nav.querySelector(".first").disabled = prev ? false : true; // Habilita el botón "Primero" si hay una página anterior.
        nav.querySelector(".prev").disabled = prev ? false : true; // Habilita el botón "Anterior" si hay una página anterior.
        nav.querySelector(".next").disabled = next ? false : true; // Habilita el botón "Siguiente" si hay una página siguiente.
        nav.querySelector(".last").disabled = next ? false : true; // Habilita el botón "Último" si hay una página siguiente.

        // Establecer atributos data para los botones de navegación
        nav.querySelector(".first").setAttribute("data-first", first); // Asigna el número de la primera página al botón correspondiente.
        nav.querySelector(".prev").setAttribute("data-prev", prev); // Asigna el número de la página anterior al botón correspondiente.
        nav.querySelector(".next").setAttribute("data-next", next); // Asigna el número de la siguiente página al botón correspondiente.
        nav.querySelector(".last").setAttribute("data-last", last); // Asigna el número de la última página al botón correspondiente.

        // Limpiar el contenido anterior de la tabla
        tbody.innerHTML = ""; // Borra el contenido anterior de la tabla para evitar duplicados.

        // Filtrar solo los usuarios con rol de "cliente"
        // const clientes = data.users.filter(usuario => usuario.rol === 'cliente'); // Esta línea está comentada, pero podría usarse para filtrar solo los usuarios con rol de cliente.

        // Procesar cada cliente y llenar el template
        // data.data: Aquí, data es un objeto que, según la estructura devuelta por la API, contiene una propiedad llamada data. Esta propiedad
        // es un arreglo (array) de usuarios que se han recuperado en la solicitud.

        // forEach: Es un método de los arrays en JavaScript que se utiliza para ejecutar una función específica en cada elemento del array. 
        // En este caso, estamos iterando sobre cada usuario en data.data.
        // element: Es el parámetro que representa cada usuario del array durante la iteración.
        data.data.forEach((element) => { // Itera sobre cada elemento en la lista de datos recibidos.
            if (element.rol === 'cliente') { // Verifica si el rol del usuario es 'cliente'.
                // Llenar los datos del cliente en el template clonado
                $template.querySelector('.id').textContent = element.id || ''; // Asigna el ID del cliente al campo correspondiente en el template.
                $template.querySelector('.nombres').textContent = element.nombres || ''; // Asigna los nombres del cliente.
                $template.querySelector('.apellidos').textContent = element.apellidos || ''; // Asigna los apellidos del cliente.
                $template.querySelector('.correo').textContent = element.correo || ''; // Asigna el correo del cliente.
                $template.querySelector('.teléfono').textContent = element.telefono || ''; // Asigna el número de teléfono del cliente.
                $template.querySelector('.dirección').textContent = element.direccion || ''; // Asigna la dirección del cliente.
                $template.querySelector('.descripción').textContent = element.descripcion || ''; // Asigna la descripción del cliente.
                $template.querySelector('.rol').textContent = element.rol || ''; // Asigna el rol del cliente.
                $template.querySelector('.estado-cuenta').textContent = element.estado_cuenta || ''; // Asigna el estado de cuenta del cliente.


                // Base: actualizar.html es la página a la que se redirige para editar los datos del usuario.
                // Parámetro de consulta: ?id=${element.id} es el parámetro que se pasa en la URL, donde ${element.id} se reemplaza por el ID 
                // real del usuario que se está procesando en esa iteración. Por ejemplo, si element.id es 123, la URL resultante sería 
                // actualizar.html?id=123.
                
                // Enlace de restablecimiento de contraseña:
                // Estructura de la URL: restablecer la contraseña/restablecer.html?id=${element.id}
                // Base: restablecer la contraseña/restablecer.html es la página a la que se redirige para restablecer la contraseña del usuario.
                // Parámetro de consulta: Al igual que el enlace anterior, ?id=${element.id} indica qué usuario se va a restablecer. 
                // Siguiendo el ejemplo anterior, si element.id es 123, la URL resultante sería restablecer la contraseña/restablecer.html?id=123.

                // Agregar enlaces de edición 
                $template.querySelector('.edit-user').setAttribute('href', `actualizar.html?id=${element.id}`); // Establece el enlace de edición para el usuario.

                // Agregar enlaces de restablecer
                $template.querySelector('.restablecer-user').setAttribute('href', `restablecer la contraseña/restablecer.html?id=${element.id}`); // Establece el enlace para restablecer la contraseña.

                // Clonar el contenido del template para usarlo
                // El método importNode se utiliza para crear una copia de un nodo (y sus hijos) desde un documento diferente. Este método es
                // especialmente útil al trabajar con templates o fragmentos de documentos.
                // Un valor booleano que indica si deseas hacer una copia profunda del nodo. Si es true, se importan todos los nodos hijos. Si es
                // false, solo se importa el nodo en sí, sin sus hijos.
                const clone = document.importNode($template, true); // Clona el contenido del template para evitar modificar el original.

                // Agregar el clone al fragmento
                //  El método appendChild se utiliza para agregar un nodo como el último hijo de un nodo padre. Es un método del objeto Node 
                // que permite manipular la estructura del DOM.
                $fragmento.appendChild(clone); // Agrega el clone al fragmento de documento.
            }
        });

        // Agregar el fragmento al tbody
        tbody.appendChild($fragmento); // Inserta el fragmento en el tbody, agregando todas las filas de una vez.

    } catch (error) {
        console.error('Error al listar usuarios:', error); // Captura y muestra errores en la consola si falla la solicitud.
    }
};

// Ejecutar la función para listar usuarios al cargar el script
listarUsuarios(); // Llama a la función para listar los usuarios al cargar el script.



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



// Escucha cualquier clic en el documento
document.addEventListener("click", (e) => {

    // 'e' es el evento que ocurre cuando se hace clic. 'e.target' es el elemento exacto donde se hizo clic.
    // 'e.target.matches' verifica si el elemento clicado tiene una clase CSS específica.
    if(e.target.matches(".first")) { 
        // Verifica si el elemento clicado tiene la clase 'first'.

        const nodos = tbody; 
        // 'tbody' es la referencia al cuerpo de la tabla (el lugar donde se listan los productos).

        const first = e.target.dataset.first; 
        // 'e.target.dataset' contiene todos los atributos 'data-*' personalizados del elemento clicado.
        // 'dataset.first' obtiene el valor del atributo 'data-first', que indica la primera página a cargar.

        // Limpia la tabla eliminando todas las filas antes de cargar nuevos datos
        while (nodos.firstChild) {
            // 'nodos.firstChild' hace referencia al primer elemento hijo dentro del tbody (las filas de la tabla).
            // El bucle continúa mientras haya elementos hijos en el tbody.
            // firstChild es una propiedad que devuelve el primer nodo hijo de un elemento.
            nodos.removeChild(nodos.firstChild); 
            // 'nodos.removeChild(nodos.firstChild)' elimina el primer elemento hijo (primera fila de la tabla).
        }

        listarUsuarios(first); 
        // Llama a la función 'listarProductos' y le pasa el valor de la primera página para cargar los productos correspondientes.
    }

    // Verifica si el elemento clicado tiene la clase 'prev' (para ir a la página anterior)
    if(e.target.matches(".prev")) { 
        const nodos = tbody; 
        const prev = e.target.dataset.prev; 
        // 'dataset.prev' accede al valor de 'data-prev' del botón para saber qué página anterior cargar.
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild); 
            // Elimina todas las filas de la tabla antes de cargar los nuevos productos.
        }
        listarUsuarios(prev); 
        // Llama a la función 'listarProductos' para cargar los productos de la página anterior.
    }

    // Verifica si el elemento clicado tiene la clase 'next' (para ir a la página siguiente)
    if(e.target.matches(".next")) { 
        const nodos = tbody; 
        const next = e.target.dataset.next; 
        // 'dataset.next' accede al valor de 'data-next' del botón para saber qué página siguiente cargar.
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild); 
            // Elimina todas las filas de la tabla antes de cargar los nuevos productos.
        }
        listarUsuarios(next); 
        // Llama a la función 'listarProductos' para cargar los productos de la siguiente página.
    }

    // Verifica si el elemento clicado tiene la clase 'last' (para ir a la última página)
    if(e.target.matches(".last")) { 
        const nodos = tbody; 
        const last = e.target.dataset.last; 
        // 'dataset.last' accede al valor de 'data-last' del botón para saber qué última página cargar.
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild); 
            // Elimina todas las filas de la tabla antes de cargar los nuevos productos.
        }
        listarUsuarios(last); 
        // Llama a la función 'listarProductos' para cargar los productos de la última página.
    }

});