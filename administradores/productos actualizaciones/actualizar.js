// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Obtener los elementos del formulario
const form = document.querySelector('#update-product-form');
const inputId = document.querySelector('#product-id');
const inputNombre = document.querySelector('#product-name');
const inputDescripcion = document.querySelector('#product-description');
const inputPrecio = document.querySelector('#product-price');
const inputImagen = document.querySelector('#productImage'); // Input de archivo
const inputCategoria = document.querySelector('#productCategory');
const inputCantidad = document.querySelector('#product-quantity');
const imgPreview = document.querySelector('#product-preview'); // Imagen de vista previa

// Cargar datos del producto y llenar el formulario
const loadProductData = async () => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`);
        if (response.ok) {
            const product = await response.json();
            inputId.value = product.id;
            inputNombre.value = product.nombre;
            inputDescripcion.value = product.descripción;
            inputPrecio.value = product.precio;
            inputCantidad.value = product.cantidad;
            inputCategoria.value = product.categoria;

            // Mostrar la imagen del producto en el elemento <img>
            if (product.imagen) {
                imgPreview.src = product.imagen; // Asignar el src de la imagen
            } else {
                imgPreview.src = ''; // Si no hay imagen, dejar el campo vacío
            }
        } else {
            alert('Error al cargar los datos del producto.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los datos del producto.');
    }
};

// Actualizar el producto
const updateProduct = async (event) => {
    event.preventDefault();

    const updatedProduct = {
        nombre: inputNombre.value,
        descripción: inputDescripcion.value,
        precio: inputPrecio.value,
        cantidad: inputCantidad.value,
        imagen: imgPreview.src, // Usar la imagen que ya está cargada como Base64
        categoria: inputCategoria.value,
        estado: "activo"
    };

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            alert('Producto actualizado exitosamente');
            window.location.href = 'listar.html'; // Redirigir a la lista de productos
        } else {
            alert('Error al actualizar el producto. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la actualización del producto. Verifica tu conexión e intenta de nuevo.');
    }
};

// Cargar datos del producto al cargar la página
document.addEventListener('DOMContentLoaded', loadProductData);

// Manejar el envío del formulario
form.addEventListener('submit', updateProduct);


// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// URLSearchParams es una interfaz de la API de JavaScript para manejar parámetros de búsqueda en URLs. Permite crear, obtener, modificar y eliminar estos 
// parámetros de manera eficiente. Aquí hay un resumen de los métodos más comunes y su uso:

// append(name, value): Añade un nuevo parámetro.
// et(name): Obtiene el valor de un parámetro.
// set(name, value): Establece o actualiza el valor de un parámetro.
// delete(name): Elimina un parámetro.
// has(name): Verifica si un parámetro existe.
// toString(): Convierte los parámetros en una cadena de consulta.