// IMPORTANCIONES
import solicitud from "../modulos/solicitud.js";

// Función para cargar los productos desde la API y mostrarlos en la página
async function productos() {
    try {
        // Obtener los productos de la API
        const productos = await solicitud("productos");

        // Obtener el elemento del DOM donde se mostrarán los productos
        const productList = document.querySelector("#productList");

        // Obtener el template y su contenido
        const productTemplate = document.querySelector("#productTemplate");
        const templateContent = productTemplate.content;

        // Iterar sobre cada producto en la lista
        productos.forEach((product) => {
            // Filtrar productos que están activos
            if (product.estado === 'activo') {
            // Asignar valores predeterminados para las propiedades del producto si no están definidos
            const productImage = product.imagen || "...";
            const productName = product.nombre || "...";
            const productPrice = product.precio || "...";
            const productDescription = product.descripción || "...";
            const category = product.categoria || "...";

            // Clonar el contenido del template
            const productElement = document.importNode(templateContent, true);

            // Asignar los valores del producto al template clonado
            productElement.querySelector(".contenedor__imagen img").src = productImage;
            productElement.querySelector(".texto__producto").textContent = category;
            productElement.querySelector(".titulo__producto strong").textContent = productName;
            productElement.querySelector(".precio__producto--price").textContent = `$${productPrice}`;
            productElement.querySelector(".producto__descripcion p").innerHTML = `<strong>${productName}:</strong> ${productDescription}`;


            // Añadir el nuevo contenedor del producto al elemento productList en el DOM
            productList.appendChild(productElement);

            }

        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función productos cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", productos);

// Evento para el filtro de búsqueda
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) {
        // Si se presiona "Escape", limpiar el campo de búsqueda
        if (e.key === "Escape") {
            e.target.value = "";
            // Volver a mostrar todos los productos si el campo de búsqueda está vacío
            document.querySelectorAll(".producto").forEach((producto) => {
                producto.classList.remove("filtro");
            });
        } else {
            // Filtrar productos según el texto de búsqueda
            const searchValue = e.target.value.toLowerCase();
            document.querySelectorAll(".producto").forEach((producto) => {
                // Comprueba si el texto del producto incluye el valor de búsqueda
                producto.textContent.toLowerCase().includes(searchValue)
                    ? producto.classList.remove("filtro") // Muestra el producto si coincide
                    : producto.classList.add("filtro"); // Oculta el producto si no coincide
            });
        }
    }
});