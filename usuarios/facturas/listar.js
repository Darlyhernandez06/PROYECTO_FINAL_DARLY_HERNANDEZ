// Obtener el nombre completo y el tipo de usuario del almacenamiento local
const userName = localStorage.getItem('userName');
const userType = localStorage.getItem('userType');

// Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
if (userName) {
    document.querySelector('#loggedInUserNamecliente').innerHTML = `
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
    menu.style.display = 'none'; // Ocultar el menú cambiando su estilo
});


// Función para cargar las facturas y mostrarlas en la vista
const cargarFacturas = async () => {
    try {
        // Obtener las facturas desde el servidor
        const response = await fetch('http://localhost:3000/factura');
        const facturas = await response.json();

        // Obtener el ID del usuario desde localStorage
        const userId = localStorage.getItem('userId');

        // Filtrar las facturas para obtener solo las del usuario actual
        const facturasFiltradas = facturas.filter(factura => factura.userId === userId);

        // Seleccionar el contenedor para las facturas
        const contenedorFacturas = document.querySelector('#contenedorFacturas');
        const noPedidos = document.querySelector('#noPedidos');
        const template = document.querySelector('#facturasContenedor');

        // Si no hay facturas, mostrar el mensaje correspondiente
        if (facturasFiltradas.length === 0) {
            noPedidos.style.display = 'flex';
            return;
        }

        noPedidos.style.display = 'none';

        // Limpiar cualquier contenido previo en el contenedor
        contenedorFacturas.innerHTML = ''; // Limpiar el tbody

         // Función para convertir la fecha del formato dd/mm/yyyy a yyyy-mm-dd
         const convertirFecha = (fechaStr) => {
            const [day, month, year] = fechaStr.split('/');
            return `${year}-${month}-${day}`;
        };

        // Función para formatear la fecha como dd/mm/yyyy
        const formatearFecha = (fechaStr) => {
            const [year, month, day] = fechaStr.split('-');
            return `${day}/${month}/${year}`;
        };

        // Recorrer cada factura y crear un elemento basado en el template
        facturasFiltradas.forEach(factura => {

            // Clonar el contenido del template
            const facturaElement = document.importNode(template.content, true);

            // Procesar la lista de productos
            const productos = factura.productos.map(p => `${p.nombre} (${p.cantidad})`).join(', ');
            
            // Convertir y formatear la fecha de la factura
            const fechaConvertida = convertirFecha(factura.fecha); // Convertir a formato yyyy-mm-dd
            const fechaFormateada = formatearFecha(fechaConvertida); // Formatear a dd/mm/yyyy
            
            // Rellenar los datos de la factura
            facturaElement.querySelector('.factura-id').innerText = factura.id;
            facturaElement.querySelector('.fecha').innerText = fechaFormateada; // Mostrar fecha
            facturaElement.querySelector('.total').innerText = `$${factura.total}`; // Mostrar total formateado
            facturaElement.querySelector('.productos').innerText = productos; // Mostrar productos
            facturaElement.querySelector('.estado').innerText = factura.estado_factura; // Mostrar estado

            // Añadir el elemento al contenedor de facturas
            contenedorFacturas.appendChild(facturaElement);
        });
    } catch (error) {
        console.error('Error al cargar las facturas:', error);
    }
};

// Llamar a la función cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarFacturas);


// Función para actualizar el contador del carrito en la interfaz
async function actualizarContadorCarrito() {
    try {
        // Obtener el userId desde localStorage
        const userId = localStorage.getItem('userId');

        // Obtener los productos actuales en el carrito para ese usuario
        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
        const carrito = await response.json();

        // Contar el número total de productos en el carrito
        const totalProductos = carrito.length; // Contar la cantidad de productos en el carrito

        // Actualizar el contador en el HTML
        document.querySelector("#cuenta_carrito").textContent = totalProductos;
    } catch (error) {
        console.error("Error al actualizar el contador del carrito:", error);
    }
}

// Llama a la función para actualizar el contador del carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
