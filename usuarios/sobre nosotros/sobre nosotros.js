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