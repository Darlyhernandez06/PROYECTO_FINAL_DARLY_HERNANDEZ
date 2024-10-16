// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Variables
const tbody = document.querySelector("tbody");

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

const listarProductosPapelera = async (page) => {
    // Definición de la función listarProductos que toma un parámetro opcional 'page'.
    const _page = page ? page : 1; // Si 'page' está definido, se usa; de lo contrario, se asigna 1.

    try {
        // Obtener los datos de productos desde el servidor
        // La función 'solicitud' realiza una llamada a la API y se espera que resuelva (await)
        const data = await solicitud(`productos?estado=papelera&_page=${_page}&_per_page=3`); // Llama a la función de solicitud para obtener productos
 
        console.log(data); // Imprime la respuesta para verificar su estructura.
 
        // Manejo con los botones de navegación
        const nav = document.querySelector(".navegacion"); // Selecciona el elemento de navegación en el DOM.
 
        // Carga los datos que trae la API
        const first = data.first; // Obtiene el número de la primera página.
        const prev = data.prev; // Obtiene el número de la página anterior.
        const next = data.next; // Obtiene el número de la siguiente página.
        const last = data.last; // Obtiene el número de la última página.
 
        console.log(`first: ${first}, prev: ${prev}, next: ${next}, last: ${last}`); // Imprime los números de página para depuración.
 
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
 
        // Procesar cada producto y llenar el template
        // La línea data.data.forEach((element) => { itera sobre cada producto en el array 'data', permitiendo que se
        // ejecute un bloque de código para cada producto, donde 'element' se refiere al producto actual en
        // esa iteración. Esto permite manipular y mostrar la información de cada producto según sea necesario.
        data.data.forEach((element) => {
            if (element.estado === 'papelera') {  // Filtrar productos en la papelera
                // Llenar los datos del producto en el template clonado
                $template.querySelector('.id').textContent = element.id;
                $template.querySelector('.nombre').textContent = element.nombre;
                $template.querySelector('.descripción').textContent = element.descripción;
                $template.querySelector('.precio').textContent = element.precio;
                $template.querySelector('.cantidad').textContent = element.cantidad;
                
                // Crear un elemento de imagen
                const imgElement = document.createElement('img');
                imgElement.src = element.imagen; // Establecer la URL de la imagen
                imgElement.alt = element.nombre; // Agregar un texto alternativo 
                imgElement.classList.add('imagen'); // Agregar la clase si la necesitas para CSS
                imgElement.style.width = '100%'; // Ajustar el ancho si es necesario
                imgElement.style.height = 'auto'; // Mantener la proporción de la imagen
                
                // Limpiar el contenido anterior de la clase imagen y agregar la nueva imagen
                const imagenContainer = $template.querySelector('.imagen');
                imagenContainer.innerHTML = ''; // Limpiar el contenido anterior
                imagenContainer.appendChild(imgElement); // Agregar la imagen al contenedor

                $template.querySelector('.categoria').textContent = element.categoria;

                // Actualizar los enlaces con el id del producto
                const restablecerLink = $template.querySelector('.restablecer-producto1');

                restablecerLink.setAttribute('data-id', element.id);

                // Clonar el contenido del template para usarlo
                const clone = document.importNode($template, true);

                // Agregar el clone al fragmento
                $fragmento.appendChild(clone);
            }
        });

        // Agregar el fragmento al tbody después de procesar todos los productos
        tbody.appendChild($fragmento);

        // Agregar evento de envío a la papelera a los botones
        document.querySelectorAll('.restablecer-producto1').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-id');
                restablcerProducto(productId); // restablecer producto
            });
        });

        // Agregar evento de envío a la papelera a los botones
        document.querySelectorAll('.delete-product1').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
            });
        });

    } catch (error) {
        console.error('Error al listar productos en la papelera:', error);
    }
};

// Función para restablecer un producto
const restablcerProducto = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas restablecer este producto?')) return;

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'PATCH', // Usamos PATCH para actualizar parcialmente el producto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'activo' }), // Cambiamos el estado a "papelera"
        });

        if (response.ok) {
            alert('Producto restablecido exitosamente');
            // Actualizar la tabla después de enviar a la papelera
            document.querySelector("tbody").innerHTML = '';
            await listarProductosPapelera(); // Llamar de nuevo para actualizar la lista
            window.location.href = "listar.html";
        } else {
            alert('Error al restablecer el producto. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la acción de restablecer el producto. Verifica tu conexión e intenta de nuevo.');
    }
}

// Ejecutar la función para listar productos en la papelera al cargar la página
listarProductosPapelera();


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

        listarProductosPapelera(first); 
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
        listarProductosPapelera(prev); 
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
        listarProductosPapelera(next); 
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
        listarProductosPapelera(last); 
        // Llama a la función 'listarProductos' para cargar los productos de la última página.
    }

});