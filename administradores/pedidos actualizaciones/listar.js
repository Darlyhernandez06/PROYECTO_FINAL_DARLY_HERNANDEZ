// Función para obtener el nombre del cliente basado en el userId
async function obtenerNombreCliente(userId) {
    try {
        const response = await fetch('http://localhost:3000/users'); // Ajusta la URL según tu servidor
        const clientes = await response.json();

        const cliente = clientes.find(cliente => cliente.id === userId);
        return cliente ? cliente.nombres : 'Nombre no disponible';
        
    } catch (error) {
        console.error('Error al obtener el nombre del cliente:', error);
        return 'Nombre no disponible';
    }
}

// Función para cargar los pedidos desde el servidor y mostrarlos en la tabla
async function cargarPedidos() {
    try {
        // Obtener los pedidos desde el servidor
        const response = await fetch('http://localhost:3000/factura'); // Ajusta la URL según tu servidor
        const pedidos = await response.json();

        // Seleccionar el tbody donde se agregarán las filas
        const tbody = document.querySelector('tbody');

        // Limpiar el contenido actual del tbody
        tbody.innerHTML = '';

        // Seleccionar el template para las filas de la tabla
        const template = document.querySelector('#template');

        // Iterar sobre cada pedido
        for (const pedido of pedidos) {
            // Obtener el nombre del cliente
            const nombreCliente = await obtenerNombreCliente(pedido.userId);

            // Clonar el contenido del template
            const clone = document.importNode(template.content, true);

            // Rellenar el contenido del template con los datos del pedido
            clone.querySelector('.id').textContent = pedido.id;
            clone.querySelector('.cliente').textContent = `(ID: ${pedido.userId}) ${nombreCliente}`;
            clone.querySelector('.fecha').textContent = pedido.fecha;
            clone.querySelector('.numero').textContent = pedido.numero; 
            clone.querySelector('.total').textContent = `$${pedido.total.toFixed(2)}`;
            clone.querySelector('.productos').textContent = pedido.productos.map(p => `${p.nombre} (${p.cantidad})`).join(', '); // Muestra productos
            clone.querySelector('.estado').textContent = pedido.estado_factura;

            // Seleccionar el botón de editar y asignarle un evento de clic
            const editButton = clone.querySelector('.edit-pedido');
            editButton.setAttribute('data-id', pedido.id); // Establecer el ID del pedido en el atributo data-id

            // Añadir el pedido clonado al tbody
            tbody.appendChild(clone);
        }

        // Agregar evento a los botones de editar
        document.querySelectorAll('.edit-pedido').forEach(button => {
            button.addEventListener('click', (e) => {
                const pedidoId = e.currentTarget.getAttribute('data-id');
                // Aquí puedes agregar la lógica para editar el pedido
                console.log(`Editar pedido con ID: ${pedidoId}`);
                // Por ejemplo, redirigir a una página de edición
                // window.location.href = `/editar-pedido.html?id=${pedidoId}`;
            });
        });

    } catch (error) {
        console.error('Error al cargar los pedidos:', error);
    }
}

// Llamar a la función cargarPedidos cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarPedidos);



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