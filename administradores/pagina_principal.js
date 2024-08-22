// Define una función asincrónica para cargar los productos
async function cargarProductos() {
    try {
        // Realiza una solicitud GET a la API para obtener los productos destacados
        const response = await fetch('http://localhost:3000/productos_destacados'); 
        // Convierte la respuesta en formato JSON
        const productos = await response.json();

        // Selecciona el contenedor donde se mostrarán los productos
        const productosContenedor = document.querySelector("#productosContenedor");
        // Selecciona el template que se usará para cada producto
        const productTemplate = document.querySelector("#productTemplate");

        // Limpia el contenedor antes de agregar nuevos productos
        productosContenedor.innerHTML = '';

        // Limita el número de productos a mostrar (por ejemplo, 3)
        const productosDestacados = productos.slice(0, 3);

        // Itera sobre los productos destacados para crear y añadir cada uno al contenedor
        productosDestacados.forEach(producto => {
            // Clona el contenido del template para cada producto
            const clone = document.importNode(productTemplate.content, true);

            // Rellena el contenido del template con los datos del producto
            const imgElement = clone.querySelector(".contenedor__imagen img");
            imgElement.src = producto.imagen;
            imgElement.alt = `Imagen de ${producto.nombre}`;
            
            // Rellena el texto de la categoría del producto
            clone.querySelector(".texto__producto").textContent = producto.categoria;
            // Rellena el título del producto
            clone.querySelector(".titulo__producto strong").textContent = producto.nombre;
            // Rellena el precio del producto
            clone.querySelector(".precio__producto strong").textContent = `$${producto.precio}`;
            
            // Añade el ID del producto al enlace de edición
            const editLink = clone.querySelector(".edit-product");
            editLink.dataset.id = producto.id;

            // Añade el producto clonado al contenedor
            productosContenedor.appendChild(clone);
        });
    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre un problema al cargar los productos
        console.error('Error al cargar los productos:', error);
    }
}

// Ejecuta la función cargarProductos cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarProductos);

// Añade un event listener al documento para manejar clics en elementos con la clase 'edit-product'
document.addEventListener('click', function(event) {
    // Verifica si el clic fue en un elemento con la clase 'edit-product'
    if (event.target.closest('.edit-product')) {
        // Previene el comportamiento por defecto del enlace (si es un enlace)
        event.preventDefault();
        // Obtiene el ID del producto desde el atributo data-id del elemento clicado
        const productId = event.target.closest('.edit-product').dataset.id;
        // Redirige a la página de edición del producto con el ID correspondiente en la URL
        window.location.href = `../administradores/productos destacados/editar_productos.html?id=${productId}`;
    }
});

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

