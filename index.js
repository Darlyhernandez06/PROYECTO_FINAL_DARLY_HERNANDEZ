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