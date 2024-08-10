// Agrega un evento de 'submit' al formulario con id 'create-product-form'
document.querySelector('#create-product-form').addEventListener('submit', (event) => {
    // Previene el comportamiento predeterminado de enviar el formulario
    event.preventDefault();
    
    // Obtiene los valores de los campos del formulario
    const name = document.querySelector('#product-name').value;
    const description = document.querySelector('#product-description').value;
    const price = document.querySelector('#product-price').value;
    const quantity = document.querySelector("#product-quantity").value;
    const productImage = document.querySelector('#productImage').value;
    const productCategory = document.querySelector("#productCategory").value;

    // Obtiene los productos almacenados en localStorage o una lista vacía si no existen
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Añade un nuevo producto a la lista de productos
    products.push({
        name,
        description,
        price,
        quantity,
        productImage,
        productCategory, 
    });
    
    // Actualiza el localStorage con la nueva lista de productos
    localStorage.setItem('products', JSON.stringify(products));

    // Redirige a la página 'listar.html' después de crear el producto
    window.location.href = 'listar.html';
});

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - window.location.href: es una propiedad en JavaScript que representa la URL completa de la página actual en el navegador. Se puede 
// usar para obtener o establecer la dirección URL de la ventana del navegador.