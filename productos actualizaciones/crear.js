document.getElementById('create-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const quantity = document.getElementById('product-quantity').value;
    const productImage = document.getElementById('productImage').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({
        name,
        description,
        price,
        productImage,
        productCategory,
    });
    localStorage.setItem('products', JSON.stringify(products));

    window.location.href = 'listar.html'; // Redirigir a la lista de productos después de crear
});