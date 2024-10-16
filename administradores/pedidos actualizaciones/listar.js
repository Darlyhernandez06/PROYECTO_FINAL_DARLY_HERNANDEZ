import { generarPDF } from '../../descargar_factura.js'; // Importa la función generarPDF desde el archivo descargar_factura.js.

// Función para obtener el nombre del cliente basado en el userId
async function obtenerNombreCliente(userId) {
    try {
        const response = await fetch('http://localhost:3000/users'); // Realiza una solicitud para obtener la lista de usuarios.
        if (!response.ok) throw new Error('Error al obtener la lista de usuarios'); // Lanza un error si la respuesta no es exitosa.
        
        const clientes = await response.json(); // Convierte la respuesta a JSON y la almacena en 'clientes'.
        
        console.log('Datos de clientes:', clientes); // Imprime en consola los datos de los clientes.
        
        const cliente = clientes.find(cliente => String(cliente.id) === String(userId)); // Busca el cliente que coincida con el userId.
        
        console.log('Cliente encontrado:', cliente); // Imprime el cliente encontrado en consola.
        
        return cliente ? cliente.nombres : 'Nombre no disponible'; // Devuelve el nombre del cliente o un mensaje predeterminado.
    } catch (error) {
        console.error('Error al obtener el nombre del cliente:', error); // Imprime el error en consola.
        return 'Nombre no disponible'; // Devuelve un mensaje predeterminado en caso de error.
    }
}

// Función para cargar las facturas desde el servidor y mostrarlas en la tabla
const cargarFacturas = async () => {
    try {
        const response = await fetch('http://localhost:3000/factura'); // Realiza una solicitud para obtener las facturas.
        if (!response.ok) throw new Error('Error al cargar las facturas'); // Lanza un error si la respuesta no es exitosa.
        const facturas = await response.json(); // Convierte la respuesta a JSON y la almacena en 'facturas'.

        const clientesPromises = facturas.map(factura => obtenerNombreCliente(factura.userId)); // Crea un array de promesas para obtener los nombres de los clientes.
        const nombresClientes = await Promise.all(clientesPromises); // Espera a que todas las promesas se resuelvan.

        const tbody = document.querySelector('tbody'); // Selecciona el elemento <tbody> donde se agregarán las filas.
        tbody.innerHTML = ''; // Limpia el contenido actual del <tbody>.

        const template = document.querySelector('#template'); // Selecciona el template para las filas de la tabla.

        // Iterar sobre cada factura
        // i es el index en cada vuelta
        for (let i = 0; i < facturas.length; i++) {
            const factura = facturas[i]; // Obtiene la factura actual.
            const nombreCliente = nombresClientes[i]; // Obtiene el nombre del cliente correspondiente.

            const clone = document.importNode(template.content, true); // Clona el contenido del template.

            // Rellenar el contenido del template con los datos de la factura
            clone.querySelector('.id').textContent = factura.id; // Rellena el ID de la factura.
            clone.querySelector('.estado').textContent = factura.estado_factura; // Rellena el estado de la factura.
            clone.querySelector('.numero').textContent = factura.numero || 'N/A'; // Rellena el número de la factura o 'N/A'.
            clone.querySelector('.fecha').textContent = factura.fecha || 'N/A'; // Rellena la fecha de la factura o 'N/A'.
            clone.querySelector('.total').textContent = `$${factura.total ? factura.total.toFixed(0) : 'N/A'}`; // Rellena el total de la factura.

            const linkDescargar = clone.querySelector('.factura'); // Selecciona el enlace para descargar la factura.
            linkDescargar.addEventListener('click', function(event) { // Añade un evento click al enlace.
                event.preventDefault(); // Previene la acción por defecto del enlace.
                generarPDF(factura); // Llama a la función generarPDF con la factura.
            });

            // Mostrar productos con cantidad
            const productos = factura.productos.map(p => `${p.nombre} (${p.cantidad})`).join(', '); // Genera una lista de productos.
            clone.querySelector('.productos').textContent = productos; // Rellena el campo de productos en el template.

            // Mostrar el nombre del cliente
            clone.querySelector('.cliente').textContent = nombreCliente; // Rellena el nombre del cliente en el template.

            // Configurar el enlace para editar la factura
            clone.querySelector('.edit-factura').href = `actualizar.html?id=${factura.id}`; // Configura el enlace para editar la factura.

            tbody.appendChild(clone); // Añade la factura clonada al tbody.
        }
    } catch (error) {
        console.error('Error al cargar las facturas:', error); // Imprime el error en consola.
    }
};

// Llamar a la función cargarFacturas cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarFacturas); // Añade un evento que llama a cargarFacturas cuando el documento está listo.

// Obtener el nombre completo del usuario almacenado en localStorage
const userName = localStorage.getItem('userName'); // Obtiene el nombre del usuario de localStorage.

// Obtener el tipo de usuario almacenado en localStorage
const userType = localStorage.getItem('userType'); // Obtiene el tipo de usuario de localStorage.

// Verificar si hay un nombre de usuario almacenado en localStorage
if (userName) {
    // Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
    document.querySelector('#loggedInUserName').innerHTML = `
        <strong>${userName}</strong><br>
        <small>${userType}</small>
    `;
}

// Obtener los elementos para la gestión del menú de perfil
const salir = document.querySelector('.img-salir'); // Selecciona el botón para salir.
const menu = document.querySelector('.menu_perfil'); // Selecciona el menú de perfil.
const desplegable = document.querySelector('.desplegable'); // Selecciona el botón para desplegar el menú.

// Mostrar el menú de perfil cuando se hace clic en el botón desplegable
desplegable.addEventListener('click', () => {
    menu.classList.add('estilos'); // Agrega una clase que muestra el menú.
});

// Ocultar el menú de perfil cuando se hace clic en el botón salir
salir.addEventListener('click', () => {
    menu.classList.remove('estilos'); // Quita la clase que muestra el menú.
});

// Evento para el filtro de búsqueda
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) { // Verifica si el elemento que desencadenó el evento tiene la clase "search".
        if (e.key === "Escape") { // Si se presiona "Escape", limpiar el campo de búsqueda.
            e.target.value = ""; // Limpia el valor del campo de búsqueda.
            // Volver a mostrar todos los productos si el campo de búsqueda está vacío
            document.querySelectorAll("tr").forEach((factura) => {
                factura.classList.remove("filtro"); // Quita la clase "filtro" para mostrar todas las facturas.
            });
        } else {
            // Filtrar productos según el texto de búsqueda
            const searchValue = e.target.value.toLowerCase(); // Convierte el valor de búsqueda a minúsculas.
            document.querySelectorAll("tr").forEach((factura) => {
                // Comprueba si el texto de la factura incluye el valor de búsqueda
                factura.textContent.toLowerCase().includes(searchValue)
                    ? factura.classList.remove("filtro") // Muestra la factura si coincide.
                    : factura.classList.add("filtro"); // Oculta la factura si no coincide.
            });
        }
    }
});