document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el formulario por su ID
    const form = document.querySelector('#create-product-form');
    
    // Seleccionar el botón de envío
    const boton = document.querySelector("#boton");
    
    // Seleccionar el tbody en el que agregar las filas
    const tbody = document.querySelector('tbody');

    // Añadir un evento para el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        // Capturar los datos del formulario
        const formData = {
            nombre: document.querySelector('#product-name').value,
            descripción: document.querySelector('#product-description').value,
            precio: document.querySelector('#product-price').value,
            cantidad: document.querySelector('#product-quantity').value,
            imagen: document.querySelector('#productImage').value,
            categoria: document.querySelector('#productCategory').value
        };
        
        try {
            boton.disabled = true; // Deshabilitar el botón mientras se envía el formulario
            
            // Enviar los datos al servidor
            const response = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
    
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                const data = await response.json();
    
                // Limpiar campos de entrada y eliminar clases de error
                document.querySelector('#product-name').value = "";
                document.querySelector('#product-description').value = "";
                document.querySelector('#product-price').value = "";
                document.querySelector('#product-quantity').value = "";
                document.querySelector('#productImage').value = "";
                document.querySelector('#productCategory').value = "";
                productCategory.value = "";
                    
                // Agregar el nuevo producto a la tabla
                createRow(data);
    
                // Mostrar mensaje de éxito
                alert('Producto creado exitosamente');
                window.location.href = '../productos actualizaciones/listar.html'; // Redirigir a la página de listado
            } else {
                // Manejar errores con el servidor
                alert('Error al crear el producto. Intenta de nuevo.');
            }
        } catch (error) {
            // Manejar errores en la solicitud
            console.error('Error:', error);
            alert('Hubo un problema con el envío del formulario. Verifica tu conexión e intenta de nuevo.');
        } finally {
            boton.disabled = false; // Habilitar el botón después de la solicitud
        }
    });

    // Función para crear una fila de tabla
    const createRow = (data) => {
        if (tbody) { // Asegúrate de que tbody está definido
            const tr = tbody.insertRow(-1);

            const tdNombre = tr.insertCell(0);
            const tdDescripción = tr.insertCell(1);
            const tdPrecio = tr.insertCell(2);
            const tdCantidad = tr.insertCell(3);
            const tdImagen = tr.insertCell(4);
            const tdCategoria = tr.insertCell(5);

            tdNombre.textContent = data.nombre;
            tdDescripción.textContent = data.descripción;
            tdPrecio.textContent = data.precio;
            tdCantidad.textContent = data.cantidad;
            tdImagen.textContent = data.imagen;
            tdCategoria.textContent = data.categoria;
        } else {
            console.error('Elemento tbody no encontrado.');
        }
    };
});




// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - window.location.href: es una propiedad en JavaScript que representa la URL completa de la página actual en el navegador. Se puede 
// usar para obtener o establecer la dirección URL de la ventana del navegador.