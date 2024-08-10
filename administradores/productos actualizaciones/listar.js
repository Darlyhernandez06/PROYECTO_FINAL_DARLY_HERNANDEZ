// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Variables
const tbody = document.querySelector("tbody");

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

// LISTAR LOS PRODUCTOS
const listarProductos = async () => {
    try {
        // Obtener los datos de productos
        const data = await solicitud("productos");

        // Procesar cada producto y llenar el template
        data.forEach(element => {
            // Llenar los datos del producto en el template clonado
            $template.querySelector('.nombre').textContent = element.nombre;
            $template.querySelector('.descripción').textContent = element.descripción;
            $template.querySelector('.precio').textContent = element.precio;
            $template.querySelector('.cantidad').textContent = element.cantidad;
            $template.querySelector('.imagen').textContent = element.imagen;
            $template.querySelector('.categoria').textContent = element.categoria;

            // Clonar el contenido del template para usarlo
            const clone = document.importNode($template, true);

            // Agregar el clone al fragmento
            $fragmento.appendChild(clone);
        });

        // Agregar el fragmento al tbody
        tbody.appendChild($fragmento);
    } catch (error) {
        console.error('Error al listar productos:', error);
    }
};

// Ejecutar la función para listar productos al cargar el script
listarProductos();



// Manejar clic en botones de eliminación de productos
document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        // Obtener el índice del producto a eliminar
        const index = event.currentTarget.getAttribute('data-index');
        // Obtener productos desde localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        // Eliminar el producto del array
        products.splice(index, 1);
        // Guardar el array actualizado en localStorage
        localStorage.setItem('products', JSON.stringify(products));
        // Recargar la página para reflejar los cambios
        window.location.reload();
    });
});

// Obtener el nombre de usuario del almacenamiento local
const userName = localStorage.getItem('userName');

// Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
if (userName) {
    document.querySelector('#loggedInUserName').innerHTML = userName;
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


// -menu.style.display: es una propiedad en JavaScript que se utiliza para acceder y modificar la forma en que un elemento HTML se 
// muestra en la página web. Está relacionada con la propiedad CSS display del elemento.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - El método splice(): en JavaScript se utiliza para modificar el contenido de un array mediante la eliminación, reemplazo o adición de elementos.