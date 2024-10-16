// Agrega un event listener que se activa cuando el contenido del DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
    // Crea un objeto URLSearchParams a partir de la cadena de consulta de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtiene el valor del parámetro 'id' de la cadena de consulta
    const productId = urlParams.get('id');

    // Verifica si se ha obtenido un productId válido
    if (productId) {
        try {
            // Realiza una solicitud fetch para obtener el producto con el ID específico
            const response = await fetch(`http://localhost:3000/productos_destacados/${productId}`);
            // Convierte la respuesta a formato JSON
            const producto = await response.json();

            // Verifica si el producto se ha obtenido correctamente
            if (producto) {
                // Establece el nombre del producto en el campo de entrada correspondiente
                document.querySelector('#product-name').value = producto.nombre;
                // Establece el precio del producto en el campo de entrada correspondiente
                document.querySelector('#product-price').value = producto.precio;

                // Selecciona el elemento de imagen del producto
                const imageElement = document.querySelector('#productImage');
                // Muestra la imagen actual del producto
                imageElement.src = producto.imagen;

                // Selecciona el elemento del campo de selección de categorías
                const selectCategorias = document.querySelector('#productCategory');
                // Establece la categoría del producto en el campo correspondiente
                selectCategorias.value = producto.categoria;

                // Verifica si la categoría del producto existe en las opciones del selector
                if (![...selectCategorias.options].some(option => option.value === producto.categoria)) {
                    // Si no existe, establece el valor del campo de selección en '0'
                    selectCategorias.value = '0';
                }
            }
        } catch (error) {
            // Maneja cualquier error que ocurra durante la carga del producto
            console.error('Error al cargar el producto:', error);
        }
    }
});

// Añade un event listener al formulario para manejar el evento de envío
document.querySelector("#formEditarProducto").addEventListener("submit", function (event) {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    event.preventDefault();

    // Crea un objeto URLSearchParams a partir de la cadena de consulta de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtiene el valor del parámetro 'id' de la cadena de consulta
    const productId = urlParams.get('id');

    // Obtiene el archivo de imagen seleccionado por el usuario
    const fileInput = document.querySelector('#productImage').files[0];
    // Verifica si se ha seleccionado un archivo de imagen
    if (!fileInput) {
        alert('Por favor, selecciona una imagen.');
        return; // Sale de la función si no se ha seleccionado imagen
    }

    // Crea un objeto FileReader para leer el archivo de imagen
    const reader = new FileReader();

    // Se ejecuta cuando la lectura del archivo ha finalizado
    reader.onload = async function () {
        // Obtiene el resultado de la lectura, que es una cadena base64
        const base64Image = reader.result;

        // Crea un objeto con los datos del formulario
        const formData = {
            nombre: document.querySelector('#product-name').value,
            precio: document.querySelector('#product-price').value,
            imagen: base64Image,
            categoria: document.querySelector('#productCategory').value,
        };

        try {
            // Realiza una solicitud fetch para actualizar el producto en el servidor
            const response = await fetch(`http://localhost:3000/productos_destacados/${productId}`, {
                method: 'PUT', // Método de la solicitud: PUT para actualizar
                body: JSON.stringify(formData), // Convierte el objeto formData a una cadena JSON
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8', // Especifica el tipo de contenido
                },
            });

            // Verifica si la respuesta fue exitosa
            if (response.ok) {
                alert('Producto actualizado exitosamente');
                // Redirige al usuario a la página principal de administradores
                window.location.href = "/administradores/pagina_principal.html"; 
            } else {
                // Si la respuesta no es exitosa, maneja el error
                const errorDetails = await response.json(); // Obtiene detalles del error
                console.error('Error al actualizar el producto:', response.statusText, errorDetails);
                alert('Error al actualizar el producto: ' + errorDetails.message);
            }
        } catch (error) {
            // Maneja cualquier error que ocurra durante la actualización del producto
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto. Intente de nuevo más tarde.');
        }
    };

    // Se ejecuta si hay un error al leer el archivo
    reader.onerror = function (error) {
        console.error('Error al leer el archivo:', error);
        alert('Error al leer el archivo de imagen.');
    };

    // Inicia la lectura del archivo como una URL de datos (base64)
    reader.readAsDataURL(fileInput);
});

// Definición: URLSearchParams es un objeto que proporciona métodos para trabajar con los parámetros de consulta de una URL. Permite acceder 
// y manipular los valores de los parámetros de manera sencilla.

// Uso en el código: En el código, URLSearchParams se utiliza para obtener el parámetro id de la cadena de consulta de la URL. 
// Este parámetro se usa para identificar un producto específico que se cargará y editará.

// Definición: response.statusText es una propiedad de la respuesta de una solicitud HTTP que proporciona un mensaje de estado que describe el 
// resultado de la solicitud. Este mensaje es parte de la respuesta del servidor y puede variar según el código de estado HTTP.

// Uso en el código: En el código, response.statusText se utiliza para obtener un mensaje de error descriptivo cuando la actualización de un 
// producto falla.