async function Carrito() {
    try {
        const userId = localStorage.getItem('userId');
        console.log("userId desde localStorage:", userId);
        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
        const carrito = await response.json();
        const carritoProductos = document.querySelector("#carritoProductos");
        const totalElement = document.querySelector("#total");

        // Limpia el contenido del carrito antes de volver a cargarlo
        carritoProductos.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            const carritoTemplate = document.querySelector("#carritoTemplate");
            const emptyCartClone = document.importNode(carritoTemplate.content, true);
            carritoProductos.appendChild(emptyCartClone);

            totalElement.innerHTML = '';  // Limpia el total si el carrito está vacío
        } else {
            const productTemplate = document.querySelector("#productTemplate");
            
            carrito.forEach(product => {
                const clone = document.importNode(productTemplate.content, true);

                // Rellena el contenido del template con los datos del producto
                clone.querySelector(".producto__imagen img").src = product.img;
                clone.querySelector(".producto__imagen img").alt = product.producto;
                clone.querySelector(".producto__nombre").textContent = product.producto;
                clone.querySelector(".producto__precio").textContent = `Precio: $${product.precio}`;
                clone.querySelector(".producto__cantidad").textContent = `Cantidad: ${product.cantidad}`;
                const deleteButton = clone.querySelector(".boton__eliminar");
                deleteButton.setAttribute("data-id", product.id);

                carritoProductos.appendChild(clone);

                // Calcula el total acumulado
                total += product.precio * product.cantidad;
                totalElement.innerHTML = "Total: $"+total; 
            });

            // Añadir evento de eliminación a cada botón
            document.querySelectorAll('.boton__eliminar').forEach(button => {
                button.addEventListener('click', async (e) => {
                    // Obtener el ID del producto desde el atributo data-id del botón
                    const productId = e.currentTarget.getAttribute('data-id');
                    const userId = localStorage.getItem('userId');

                    try {
                        // Eliminar el producto del carrito usando la API
                        await fetch(`http://localhost:3000/carrito/${productId}`, {
                            method: 'DELETE',
                        });

                        // Actualizar el carrito después de eliminar un producto
                        await Carrito();
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error al cargar los productos del carrito:', error);
    }
}

document.addEventListener("DOMContentLoaded", Carrito);