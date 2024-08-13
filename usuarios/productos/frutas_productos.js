// IMPORTACIONES
import solicitud from "../../modulos/solicitud.js";

// Función para cargar los productos desde la API y mostrarlos en la página
async function loadProducts() {
    try {
        // Obtener los productos de la API
        const products = await solicitud("productos");

        // Obtener el elemento del DOM donde se mostrarán los productos
        const productList = document.querySelector("#productList");

        // Limpiar el contenedor antes de llenarlo con nuevos datos
        productList.innerHTML = '';

        // Iterar sobre cada producto en la lista
        products.forEach((product) => {
            // Asignar valores predeterminados para las propiedades del producto si no están definidos
            const productImage = product.imagen || "...";
            const productName = product.nombre || "...";
            const productPrice = product.precio || "...";
            const productDescription = product.descripción || "...";
            const category = product.categoria || "...";
            const productQuantity = product.cantidad || 1; // Valor predeterminado de cantidad

            // Filtrar los productos según la categoría (en este caso, solo se muestran los productos de la categoría "Verdura")
            if (category === "Frutas") {
                // Crear un nuevo contenedor para el producto
                const productElement = document.createElement("div");
                productElement.classList.add("contenedor__producto");
                productElement.classList.add("producto");

                // Rellenar el contenedor con la información del producto usando una plantilla de cadena (template literal)
                productElement.innerHTML = `
                    <!-- Contenedor de la imagen del producto -->
                    <div class="contenedor__imagen">
                        <img src="${productImage}" alt="Imagen de producto">
                    </div>
                    <!-- Información del producto -->
                    <div class="informacion__producto">
                        <p class="texto__producto">${category}</p>
                        <h3 class="titulo__producto"><strong>${productName}</strong></h3>
                        <p class="precio__producto"><strong>$${productPrice}</strong></p>
                        <!-- Contenedor de botones para controlar la cantidad del producto -->
                        <div class="contenedor__cantidad">
                            <span class="boton__cantidad01">-</span>
                            <input type="text" class="input__cantidad" value="${1}" readonly>
                            <span class="boton__cantidad">+</span>
                        </div>
                        <!-- Botón para añadir el producto al carrito -->
                        <div class="boton-añadir">
                            <a class="boton__añadir--link" style="text-decoration: none;">Añadir al carrito</a>
                        </div>
                        <!-- Contenedor para la descripción del producto -->
                        <div class="producto__descripcion--contenedor">
                            <div class="producto__descripcion">
                                <p><strong>${productName}:</strong> ${productDescription}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Añadir el nuevo contenedor del producto al elemento productList en el DOM
                productList.appendChild(productElement);

                // Seleccionar los botones y el campo de cantidad en el contenedor del producto
                const btnDecrementar = productElement.querySelector('.boton__cantidad01');
                const btnIncrementar = productElement.querySelector('.boton__cantidad');
                const inputCantidad = productElement.querySelector('.input__cantidad');

                // Manejar el clic en el botón de decrementar
                btnDecrementar.addEventListener('click', () => {
                    let cantidadActual = parseInt(inputCantidad.value);
                    if (cantidadActual > 1) { // Evitar que la cantidad sea menor que 1
                        inputCantidad.value = cantidadActual - 1;
                    }
                });

                // Manejar el clic en el botón de incrementar
                btnIncrementar.addEventListener('click', () => {
                    let cantidadActual = parseInt(inputCantidad.value);
                    if (cantidadActual < productQuantity) { // Asegurarse de que no se exceda el stock
                        inputCantidad.value = cantidadActual + 1;
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función loadProducts cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadProducts);

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
