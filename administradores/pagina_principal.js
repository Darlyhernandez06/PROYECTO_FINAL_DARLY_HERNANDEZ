async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:3000/productos'); // Ajusta la URL a tu API

        const productos = await response.json();
        const productosContenedor = document.querySelector("#productosContenedor");
        const productTemplate = document.querySelector("#productTemplate");

        productosContenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

        // Limita el número de productos a mostrar (en este caso, 3)
        const productosDestacados = productos.slice(0, 3);

        productosDestacados.forEach(producto => {
            const clone = document.importNode(productTemplate.content, true);

            // Rellena el contenido del template con los datos del producto
            // Establecer la imagen del producto
            const imgElement = clone.querySelector(".contenedor__imagen img");
            imgElement.src = producto.imagen; // Usa la ruta de la imagen desde el JSON
            imgElement.alt = `Imagen de ${producto.nombre}`; // Texto alternativo
            
            clone.querySelector(".texto__producto").textContent = producto.categoria;
            clone.querySelector(".titulo__producto strong").textContent = producto.nombre;
            clone.querySelector(".precio__producto strong").textContent = `$${producto.precio}`;

            // Añadir el producto al contenedor
            productosContenedor.appendChild(clone);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

document.addEventListener("DOMContentLoaded", cargarProductos);

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

