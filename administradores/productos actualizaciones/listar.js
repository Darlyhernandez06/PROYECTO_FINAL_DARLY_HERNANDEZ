// IMPORTACIONES
import solicitud from "../../modulos/solicitud.js"; // Importa la función de solicitud para obtener datos del servidor

// Variables
const tbody = document.querySelector("tbody"); // Selecciona el elemento <tbody> donde se mostrarán los productos

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content; // Obtiene el contenido del template definido
// en el HTML

// FRAGMENTOS
const $fragmento = document.createDocumentFragment(); // Crea un fragmento de documento para optimizar la 
// inserción de elementos

// LISTAR LOS PRODUCTOS
const listarProductos = async (page) => {
     // Definición de la función listarProductos que toma un parámetro opcional 'page'.
     const _page = page ? page : 1; // Si 'page' está definido, se usa; de lo contrario, se asigna 1.

     try {
         // Obtener los datos de productos desde el servidor
         // La función 'solicitud' realiza una llamada a la API y se espera que resuelva (await)
         const data = await solicitud(`productos?_page=${_page}&_per_page=3`); // Llama a la función de solicitud para obtener productos
 
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
            // el primer data es el objeto que has recibido, y el segundo data es una propiedad de ese objeto. La propiedad data suele contener 
            // un array con la información que deseas procesar
            
            if (element.estado === 'activo') { // Verifica si el producto está activo
                // Llenar los datos del producto en el template clonado
                $template.querySelector('.id').textContent = element.id; // Asigna el ID del producto
                $template.querySelector('.nombre').textContent = element.nombre; // Asigna el nombre del producto
                $template.querySelector('.descripción').textContent = element.descripción; // Asigna la descripción del producto
                $template.querySelector('.precio').textContent = element.precio; // Asigna el precio del producto
                $template.querySelector('.cantidad').textContent = element.cantidad; // Asigna la cantidad del producto

                // Crear un elemento de imagen
                const imgElement = document.createElement('img'); // Crea un nuevo elemento de imagen
                imgElement.src = element.imagen; // Establecer la URL de la imagen del producto
                imgElement.alt = element.nombre; // Agregar un texto alternativo con el nombre del producto
                imgElement.classList.add('imagen'); // Agregar la clase 'imagen' para el CSS
                imgElement.style.width = '100%'; // Ajustar el ancho de la imagen
                imgElement.style.height = 'auto'; // Mantener la proporción de la imagen

                // Limpiar el contenido anterior de la clase imagen y agregar la nueva imagen
                const imagenContainer = $template.querySelector('.imagen'); // Selecciona el contenedor de la imagen
                imagenContainer.innerHTML = ''; // Limpia el contenido anterior
                imagenContainer.appendChild(imgElement); // Agrega la nueva imagen al contenedor

                $template.querySelector('.categoria').textContent = element.categoria; // Asigna la categoría del producto

                // Actualizar los enlaces con el ID del producto
                const editLink = $template.querySelector('.edit-product'); // Selecciona el enlace de edición
                const papeleraLink = $template.querySelector('.papelera-product'); // Selecciona el enlace de papelera

                // Establece el enlace de edición con el ID del producto
                // Actualiza el atributo href del enlace de edición para que apunte a la página de actualización de productos
                editLink.href = `../../administradores/productos actualizaciones/actualizar.html?id=${element.id}`; 

                // Desglose de la línea:
                // editLink: Es una referencia al elemento del enlace que permite editar el producto.
                // href: Es el atributo que define la URL a la que se dirige el enlace cuando se hace clic en él.
                // `...`: Este es un template literal, que permite incluir expresiones dentro de cadenas utilizando la sintaxis ${}.
                // ../../administradores/productos actualizaciones/actualizar.html: Es la ruta relativa a la que se está redirigiendo. 
                // Esto significa que el enlace apunta a la página de actualización del producto, que está ubicada en la carpeta 'administradores'.
                // ?id=${element.id}: Aquí se añade un parámetro de consulta (query parameter) a la URL, donde:
                // id: Es el nombre del parámetro que se pasará a la página de actualización.
                // ${element.id}: Utiliza el valor de 'id' del producto actual (representado por 'element') para que la página de actualización sepa qué producto se está editando.

                papeleraLink.setAttribute('data-id', element.id); // Establece el ID del producto en el atributo data-id

                // Clonar el contenido del template para usarlo
                const clone = document.importNode($template, true); // Clona el template

                // Agregar el clone al fragmento
                $fragmento.appendChild(clone); // Añade el clon al fragmento

                // Este método se utiliza para crear una copia de un nodo de un documento. Es especialmente 
                // útil cuando deseas copiar nodos de un documento que no está en el DOM actual, como una 
                // plantilla (<template>).
                
                // Uso:
                // document.importNode(node, deep):
                // node: El nodo que deseas copiar.
                // deep: Un booleano que indica si la copia debe incluir todos los nodos secundarios del 
                // nodo original (true) o solo el nodo en sí (false).

                // Este método se utiliza para agregar un nuevo nodo como el último hijo de un nodo padre en
                // el DOM. Si el nodo ya existe en el DOM, se moverá en lugar de crear una copia.
                
                // Uso:
                // parentNode.appendChild(childNode):
                // parentNode: El nodo al que deseas agregar el nuevo nodo.
                // childNode: El nodo que deseas agregar como hijo.

            }
        });

        // Agregar el fragmento al tbody
        tbody.appendChild($fragmento); // Inserta el fragmento en el <tbody>

       // Agregar evento de envío a la papelera a los botones
       // Selecciona todos los elementos con la clase 'papelera-product'.
       // querySelectorAll devuelve una NodeList de todos los elementos coincidentes.

       // document.querySelectorAll('.papelera-product').forEach(button => {...}) itera sobre cada botón con
       // la clase papelera-product. Para cada botón, se ejecuta la función que sigue, donde se pueden agregar
       // eventos o realizar acciones específicas.

       document.querySelectorAll('.papelera-product').forEach(button => {
        // Para cada botón encontrado, se agrega un listener para el evento 'click'
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del enlace (navegación)
            
            // Obtiene el ID del producto desde el atributo 'data-id' del botón que fue clicado
            // currentTarget es una propiedad del objeto event que se refiere al elemento en el que se ha registrado 
            // el evento. Es decir, es el elemento que actualmente está manejando el evento.
            // Uso en el código: En el fragmento proporcionado, event.currentTarget.getAttribute('data-id') se 
            // utiliza para obtener el valor del atributo data-id del botón que fue clicado. Esto es útil para 
            // identificar el elemento específico que disparó el evento, especialmente en situaciones donde hay 
            // múltiples elementos escuchando el mismo evento.
            const productId = event.currentTarget.getAttribute('data-id'); 

            // Llama a la función enviarProductoAPapelera pasando el ID del producto
            enviarProductoAPapelera(productId); // Mueve el producto a la papelera
            });
        });

    } catch (error) {
        console.error('Error al listar productos:', error); // Manejo de errores si la solicitud falla
    }
};

// Función asíncrona para enviar el producto a la papelera
// @param {string} productId - El ID del producto que se desea enviar a la papelera.
const enviarProductoAPapelera = async (productId) => {
    // Pregunta al usuario si está seguro de enviar el producto a la papelera
    if (!confirm('¿Estás seguro de que deseas enviar este producto a la papelera?')) return; // Si el usuario cancela, se detiene la función

    try {
        // Realiza una solicitud HTTP PATCH a la API para actualizar el estado del producto
        // awair espera que se cumpla la peticion fetch
        // inteporacion de cadenas
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'PATCH', // Usamos PATCH para actualizar parcialmente el producto
            headers: {
                'Content-Type': 'application/json', // Establece el tipo de contenido de la solicitud a JSON
            },
            body: JSON.stringify({ estado: 'papelera' }), // Envía el nuevo estado del producto, cambiándolo a "papelera"
        });

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            alert('Producto enviado a la papelera exitosamente'); // Mensaje de éxito para el usuario

            // Actualiza la tabla después de enviar a la papelera
            document.querySelector("tbody").innerHTML = ''; // Limpia el contenido del <tbody> para evitar mostrar información obsoleta

            await listarProductos(); // Llama de nuevo a la función listarProductos para obtener la lista actualizada de productos

            // Redirige al usuario a la página de la papelera
            window.location.href = "papelera.html"; 
        } else {
            alert('Error al enviar el producto a la papelera. Intenta de nuevo.'); // Mensaje de error si la solicitud no fue exitosa
        }
    } catch (error) {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error:', error); // Imprime el error en la consola para depuración
        alert('Hubo un problema con la acción de enviar el producto a la papelera. Verifica tu conexión e intenta de nuevo.'); // Mensaje de error al usuario
    }
};


// Ejecutar la función para listar productos al cargar el script
listarProductos(); // Llama a la función para mostrar los productos al cargar la página

// Obtener el nombre completo del usuario almacenado en localStorage
const userName = localStorage.getItem('userName'); // Obtiene el nombre del usuario

// Obtener el tipo de usuario almacenado en localStorage (por ejemplo, Administrador o Cliente)
const userType = localStorage.getItem('userType'); // Obtiene el tipo de usuario

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
    menu.classList.add('estilos'); // Agrega una clase que muestra el menú
});

// Ocultar el menú de perfil cuando se hace clic en el botón salir
salir.addEventListener('click', () => {
    menu.classList.remove('estilos'); // Quita la clase que muestra el menú
});

document.addEventListener("click", (e) => {

    if(e.target.matches(".first")){
        const nodos = tbody;
        const first = e.target.dataset.first;
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
            
        }
        listarProductos(first)
    }
    if(e.target.matches(".prev")){
        const nodos = tbody;
        const prev = e.target.dataset.prev;
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
            
        }
        listarProductos(prev)
    }
    if(e.target.matches(".next")){
        const nodos = tbody;
        const next = e.target.dataset.next;
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
            
        }
        listarProductos(next)
    }
    if(e.target.matches(".last")){
        const nodos = tbody;
        const last = e.target.dataset.last;
        while (nodos.firstChild) {
            nodos.removeChild(nodos.firstChild)
            
        }
        listarProductos(last)
    }    

});



// -menu.style.display: es una propiedad en JavaScript que se utiliza para acceder y modificar la forma en que un elemento HTML se 
// muestra en la página web. Está relacionada con la propiedad CSS display del elemento.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - El método splice(): en JavaScript se utiliza para modificar el contenido de un array mediante la eliminación, reemplazo o adición de elementos.

