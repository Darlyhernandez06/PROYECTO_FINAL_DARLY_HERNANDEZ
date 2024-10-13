// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Variables
const tbody = document.querySelector("tbody");

// TEMPLATE: Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();

// LISTAR LOS PRODUCTOS
const listarProductos = async () => {
    try {
        // Obtener los datos de productos
        const data = await solicitud("productos");

        // Procesar cada producto y llenar el template
        data.forEach((element) => {
            if (element.estado === 'activo') { // Verifica si el producto está activo
                // Llenar los datos del producto en el template clonado
                $template.querySelector('.id').textContent = element.id;
                $template.querySelector('.nombre').textContent = element.nombre;
                $template.querySelector('.descripción').textContent = element.descripción;
                $template.querySelector('.precio').textContent = element.precio;
                $template.querySelector('.cantidad').textContent = element.cantidad;

                // Crear un elemento de imagen
                const imgElement = document.createElement('img');
                imgElement.src = element.imagen; // Establecer la URL de la imagen
                imgElement.alt = element.nombre; // Agregar un texto alternativo 
                imgElement.classList.add('imagen'); // Agregar la clase si la necesitas para CSS
                imgElement.style.width = '100%'; // Ajustar el ancho si es necesario
                imgElement.style.height = 'auto'; // Mantener la proporción de la imagen
                
                // Limpiar el contenido anterior de la clase imagen y agregar la nueva imagen
                const imagenContainer = $template.querySelector('.imagen');
                imagenContainer.innerHTML = ''; // Limpiar el contenido anterior
                imagenContainer.appendChild(imgElement); // Agregar la imagen al contenedor

                $template.querySelector('.categoria').textContent = element.categoria;

                // Actualizar los enlaces con el id del producto
                const editLink = $template.querySelector('.edit-product');
                const papeleraLink = $template.querySelector('.papelera-product');

                editLink.href = `../../administradores/productos actualizaciones/actualizar.html?id=${element.id}`;
                papeleraLink.setAttribute('data-id', element.id);

                // Clonar el contenido del template para usarlo
                const clone = document.importNode($template, true);

                // Agregar el clone al fragmento
                $fragmento.appendChild(clone);
            }
        });

        // Agregar el fragmento al tbody
        tbody.appendChild($fragmento);

        // Agregar evento de envío a la papelera a los botones
        document.querySelectorAll('.papelera-product').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const productId = event.currentTarget.getAttribute('data-id');
                enviarProductoAPapelera(productId); // Mover producto a la papelera
            });
        });
    } catch (error) {
        console.error('Error al listar productos:', error);
    }
};

// Función para enviar el producto a la papelera
const enviarProductoAPapelera = async (productId) => {
    if (!confirm('¿Estás seguro de que deseas enviar este producto a la papelera?')) return;

    try {
        const response = await fetch(`http://localhost:3000/productos/${productId}`, {
            method: 'PATCH', // Usamos PATCH para actualizar parcialmente el producto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'papelera' }), // Cambiamos el estado a "papelera"
        });

        if (response.ok) {
            alert('Producto enviado a la papelera exitosamente');
            // Actualizar la tabla después de enviar a la papelera
            document.querySelector("tbody").innerHTML = '';
            await listarProductos(); // Llamar de nuevo para actualizar la lista
            window.location.href = "papelera.html";
        } else {
            alert('Error al enviar el producto a la papelera. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la acción de enviar el producto a la papelera. Verifica tu conexión e intenta de nuevo.');
    }
};

// Ejecutar la función para listar productos al cargar el script
listarProductos();

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


// -menu.style.display: es una propiedad en JavaScript que se utiliza para acceder y modificar la forma en que un elemento HTML se 
// muestra en la página web. Está relacionada con la propiedad CSS display del elemento.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - El método splice(): en JavaScript se utiliza para modificar el contenido de un array mediante la eliminación, reemplazo o adición de elementos.

