// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async function() {
    // Obtiene los parámetros de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtiene el valor del parámetro 'id' de la URL
    const productId = urlParams.get('id');

    // Si el parámetro 'id' está presente en la URL
    if (productId) {
        try {
            // Realiza una solicitud a la API para obtener los detalles del producto usando el ID
            const response = await fetch(`http://localhost:3000/productos_destacados/${productId}`);
            // Convierte la respuesta en formato JSON
            const producto = await response.json();

            // Si el producto existe, rellena los campos del formulario con la información del producto
            if (producto) {
                // Establece el valor del campo de nombre del producto en el formulario
                document.querySelector('#nombre').value = producto.nombre;
                // Establece el valor del campo de precio del producto en el formulario
                document.querySelector('#precio').value = producto.precio;
                // Establece el valor del campo de imagen del producto en el formulario
                document.querySelector('#imagen').value = producto.imagen;

                // Asegúrate de que el valor de la categoría esté en el elemento <select> del formulario
                const selectCategorias = document.querySelector('#categoria');
                selectCategorias.value = producto.categoria;

                // Si el valor de la categoría no se encuentra en las opciones del <select>
                if (![...selectCategorias.options].some(option => option.value === producto.categoria)) {
                    // Establece un valor por defecto si no hay coincidencia
                    selectCategorias.value = '0'; // Valor por defecto
                }
            }
        } catch (error) {
            // Muestra un mensaje de error en la consola si ocurre un problema al cargar el producto
            console.error('Error al cargar el producto:', error);
        }
    }
});

// Añade un event listener al formulario para manejar el evento de envío
document.querySelector("#formEditarProducto").addEventListener("submit", async function(event) {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    event.preventDefault();

    // Obtiene los parámetros de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtiene el valor del parámetro 'id' de la URL
    const productId = urlParams.get('id');

    // Crea un objeto con los datos del producto que se van a enviar al servidor
    const datosProducto = {
        nombre: document.querySelector('#nombre').value,
        precio: document.querySelector('#precio').value,
        imagen: document.querySelector('#imagen').value,
        categoria: document.querySelector('#categoria').value, // Asegúrate de que el campo coincida
    };

    try {
        // Realiza una solicitud PUT a la API para actualizar el producto con el ID especificado
        const response = await fetch(`http://localhost:3000/productos_destacados/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // Envía los datos del producto como un JSON en el cuerpo de la solicitud
            body: JSON.stringify(datosProducto)
        });

        // Si la respuesta de la API es exitosa
        if (response.ok) {
            // Muestra una alerta indicando que el producto se actualizó exitosamente
            alert('Producto actualizado exitosamente');
        } else {
            // Muestra un mensaje de error en la consola si la respuesta no es exitosa
            console.error('Error al actualizar el producto:', response.statusText);
        }
    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre un problema al enviar la solicitud
        console.error('Error al actualizar el producto:', error);
    }
});



