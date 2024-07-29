
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del formulario
    const updateForm = document.querySelector('#update-product-form');
    const productIndex = document.querySelector('#product-index');
    const productName = document.querySelector('#product-name');
    const productDescription = document.querySelector('#product-description');
    const productPrice = document.querySelector('#product-price');

    // Obtener el índice del producto a actualizar desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    // Si el índice existe, cargar los datos del producto desde el almacenamiento local
    if (index !== null) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products[index];

        // Si el producto existe, llenar el formulario con sus datos
        if (product) {
            productIndex.value = index;
            productName.value = product.name;
            productDescription.value = product.description;
            productPrice.value = product.price;
        }
    }

    // Manejar el evento de envío del formulario
    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const products = JSON.parse(localStorage.getItem('products')) || [];

        // Crear un objeto con los datos actualizados del producto
        const updatedProduct = {
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
        };

        // Actualizar el producto en la lista y guardar en el almacenamiento local
        const index = productIndex.value;
        products[index] = updatedProduct;

        // Redirigir a la página de lista de productos después de actualizar
        localStorage.setItem('products', JSON.stringify(products));
        window.location.href = 'listar.html'; // Redirigir a la lista de productos después de actualizar
    });
});