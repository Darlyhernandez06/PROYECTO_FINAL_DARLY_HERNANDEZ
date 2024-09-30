// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Variables
const tbody = document.querySelector("tbody");

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

const listarProductosPapelera = async () => {
    try {
        // Obtener los datos de productos desde el servidor
        const data = await solicitud("productos");

        // Limpiar el contenido previo del tbody (importante para evitar duplicados)
        tbody.innerHTML = '';

        // Filtrar y procesar solo los productos que están en la papelera
        data.forEach((element) => {
            if (element.estado === 'papelera') {  // Filtrar productos en la papelera
                // Llenar los datos del producto en el template clonado
                $template.querySelector('.id').textContent = element.id;
                $template.querySelector('.nombre').textContent = element.nombre;
                $template.querySelector('.descripción').textContent = element.descripción;
                $template.querySelector('.precio').textContent = element.precio;
                $template.querySelector('.cantidad').textContent = element.cantidad;
                $template.querySelector('.imagen').textContent = element.imagen;
                $template.querySelector('.categoria').textContent = element.categoria;

                // Actualizar los enlaces con el id del producto
                const restablecerLink = $template.querySelector('.restablecer-producto1');
                const eliminarLink = $template.querySelector('.delete-product1');

                restablecerLink.setAttribute('data-id', element.id);
                eliminarLink.setAttribute('data-id', element.id);

                // Clonar el contenido del template para usarlo
                const clone = document.importNode($template, true);

                // Agregar el clone al fragmento
                $fragmento.appendChild(clone);
            }
        });

        // Agregar el fragmento al tbody después de procesar todos los productos
        tbody.appendChild($fragmento);

        // Agregar evento de envío a la papelera a los botones
        document.querySelectorAll('.restablecer-producto1').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-id');
                restablcerProducto(productId); // restablecer producto
            });
        });

        // Agregar evento de envío a la papelera a los botones
        document.querySelectorAll('.delete-product1').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-id');
                eliminarProducto(productId); // eliminar producto de manera definitiva
            });
        });

    } catch (error) {
        console.error('Error al listar productos en la papelera:', error);
    }
};

// Función para restablecer un producto
const restablcerProducto = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas restablecer este producto?')) return;

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'PATCH', // Usamos PATCH para actualizar parcialmente el producto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'activo' }), // Cambiamos el estado a "papelera"
        });

        if (response.ok) {
            alert('Producto restablecido exitosamente');
            // Actualizar la tabla después de enviar a la papelera
            document.querySelector("tbody").innerHTML = '';
            await listarProductosPapelera(); // Llamar de nuevo para actualizar la lista
            window.location.href = "listar.html";
        } else {
            alert('Error al restablecer el producto. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la acción de restablecer el producto. Verifica tu conexión e intenta de nuevo.');
    }
}

// Función para eliminar un producto
const eliminarProducto = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Producto eliminado exitosamente');
            // Actualizar la tabla después de eliminar
            document.querySelector("tbody").innerHTML = '';
            await listarProductosPapelera(); // Llamar de nuevo para actualizar la lista
        } else {
            alert('Error al eliminar el producto. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la eliminación del producto. Verifica tu conexión e intenta de nuevo.');
    }
};

// Ejecutar la función para listar productos en la papelera al cargar la página
listarProductosPapelera();


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
    menu.classList.remove('estilos'); // Quitar la clase que muestra el menú
});