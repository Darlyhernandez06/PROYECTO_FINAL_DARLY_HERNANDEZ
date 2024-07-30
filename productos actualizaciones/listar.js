// Obtener el cuerpo de la tabla donde se insertarán los productos
const productTableBody = document.getElementById('product-table-body');

// Obtener productos desde localStorage o inicializar como un array vacío
const products = JSON.parse(localStorage.getItem('products')) || [];

// Iterar sobre cada producto y agregar una fila a la tabla
products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <!-- Columna con el nombre del producto -->
    <td>${product.name}</td>
    <!-- Columna con la descripción del producto -->
    <td>${product.description}</td>
    <!-- Columna con el precio del producto -->
    <td>${product.price}</td>
    <!-- Columna con la cantidad del producto -->
    <td>${product.quantity}</td>
    <td class="d-flex align-items-center justify-content-center">
        <!-- Enlace para editar el producto -->
        <a href="actualizar.html?index=${index}" class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>    
        </a>
        <!-- Enlace para eliminar el producto -->
        <a href="#" class="delete-product" data-index="${index}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg> 
        </a>
    </td>
    `;
    // Agregar la fila al cuerpo de la tabla
    productTableBody.appendChild(row);
});

// Manejar clic en botones de eliminación de productos
document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        // Obtener el índice del producto a eliminar
        const index = event.currentTarget.getAttribute('data-index');
        // Obtener productos desde localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        // Eliminar el producto del array
        products.splice(index, 1);
        // Guardar el array actualizado en localStorage
        localStorage.setItem('products', JSON.stringify(products));
        // Recargar la página para reflejar los cambios
        window.location.reload();
    });
});

// Mostrar el nombre del usuario si está disponible en localStorage
const loggedInUserName = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUserName) {
    document.getElementById('loggedInUserName').textContent = loggedInUserName.nombres+' '+loggedInUserName.apellidos;
}

// Obtener elementos para la gestión del menú de perfil
const salir = document.querySelector('.img-salir');
const menu = document.querySelector('.menu_perfil');
const desplegable = document.querySelector('.desplegable');

// Mostrar el menú de perfil cuando se hace clic en el botón desplegable
desplegable.addEventListener('click', () => {
    menu.classList.add('estilos');
});

// Ocultar el menú de perfil cuando se hace clic en el botón salir
salir.addEventListener('click', () => {
    menu.style.display = 'none';
});

// -menu.style.display: es una propiedad en JavaScript que se utiliza para acceder y modificar la forma en que un elemento HTML se 
// muestra en la página web. Está relacionada con la propiedad CSS display del elemento.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - El método splice(): en JavaScript se utiliza para modificar el contenido de un array mediante la eliminación, reemplazo o adición de elementos.