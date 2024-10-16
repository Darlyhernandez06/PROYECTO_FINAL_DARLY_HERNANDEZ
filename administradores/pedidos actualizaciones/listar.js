import { generarPDF } from '../../descargar_factura.js';

// Función para obtener el nombre del cliente basado en el userId
async function obtenerNombreCliente(userId) {
    try {
        const response = await fetch('http://localhost:3000/users'); 
        if (!response.ok) throw new Error('Error al obtener la lista de usuarios');
        
        const clientes = await response.json();
        
        // Verifica la estructura de los datos recibidos
        console.log('Datos de clientes:', clientes);
        
        // Convertir userId a string si es necesario
        const cliente = clientes.find(cliente => String(cliente.id) === String(userId));
        
        // Verifica el cliente encontrado
        console.log('Cliente encontrado:', cliente);
        
        return cliente ? cliente.nombres : 'Nombre no disponible';
    } catch (error) {
        console.error('Error al obtener el nombre del cliente:', error);
        return 'Nombre no disponible';
    }
}

// Función para cargar las facturas desde el servidor y mostrarlas en la tabla
const cargarFacturas = async () => {
    try {
        // Obtener las facturas desde el servidor
        const response = await fetch('http://localhost:3000/factura');
        if (!response.ok) throw new Error('Error al cargar las facturas');
        const facturas = await response.json();

        // Obtener los nombres de los clientes para todas las facturas
        const clientesPromises = facturas.map(factura => obtenerNombreCliente(factura.userId));
        const nombresClientes = await Promise.all(clientesPromises);

        // Seleccionar el tbody donde se agregarán las filas
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar el contenido actual

        // Seleccionar el template para las filas de la tabla
        const template = document.querySelector('#template');

        // Iterar sobre cada factura
        for (let i = 0; i < facturas.length; i++) {
            const factura = facturas[i];
            const nombreCliente = nombresClientes[i]; // Obtener el nombre del cliente correspondiente

            // Clonar el contenido del template
            const clone = document.importNode(template.content, true);

            // Rellenar el contenido del template con los datos de la factura
            clone.querySelector('.id').textContent = factura.id;
            clone.querySelector('.estado').textContent = factura.estado_factura;
            clone.querySelector('.numero').textContent = factura.numero || 'N/A';
            clone.querySelector('.fecha').textContent = factura.fecha || 'N/A';
            clone.querySelector('.total').textContent = `$${factura.total ? factura.total.toFixed(0) : 'N/A'}`;

            const linkDescargar = clone.querySelector('.factura');
            linkDescargar.addEventListener('click', function(event) {
                event.preventDefault();
                generarPDF(factura);
            });

            // Mostrar productos con cantidad
            const productos = factura.productos.map(p => `${p.nombre} (${p.cantidad})`).join(', ');
            clone.querySelector('.productos').textContent = productos;

            // Mostrar el nombre del cliente
            clone.querySelector('.cliente').textContent = nombreCliente;

            // Configurar el enlace para editar la factura
            clone.querySelector('.edit-factura').href = `actualizar.html?id=${factura.id}`;

            // Añadir la factura clonado al tbody
            tbody.appendChild(clone);
        }
    } catch (error) {
        console.error('Error al cargar las facturas:', error);
    }
};

// Llamar a la función cargarFacturas cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarFacturas);

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


// Evento para el filtro de búsqueda
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) {
        // Si se presiona "Escape", limpiar el campo de búsqueda
        if (e.key === "Escape") {
            e.target.value = "";
            // Volver a mostrar todos los productos si el campo de búsqueda está vacío
            document.querySelectorAll("tr").forEach((factura) => {
                factura.classList.remove("filtro");
            });
        } else {
            // Filtrar productos según el texto de búsqueda
            const searchValue = e.target.value.toLowerCase();
            document.querySelectorAll("tr").forEach((factura) => {
                // Comprueba si el texto del producto incluye el valor de búsqueda
                factura.textContent.toLowerCase().includes(searchValue)
                    ? factura.classList.remove("filtro") // Muestra el producto si coincide
                    : factura.classList.add("filtro"); // Oculta el producto si no coincide
            });
        }
    }
});