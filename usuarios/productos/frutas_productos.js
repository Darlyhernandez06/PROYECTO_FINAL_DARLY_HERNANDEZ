// IMPORTACIONES
import solicitud from "../../modulos/solicitud.js";

// Función para cargar los productos desde la API y mostrarlos en la página
async function productos() {
    try {
        // Obtener los productos de la API
        const productos = await solicitud("productos");

        // Obtener el elemento del DOM donde se mostrarán los productos
        const productList = document.querySelector("#productList");

        // Obtener el template y su contenido
        const productTemplate = document.querySelector("#productTemplate");
        const templateContent = productTemplate.content;

        // Iterar sobre cada producto en la lista
        productos.forEach((product) => {
            const productImage = product.imagen || "...";
            const productName = product.nombre || "...";
            const productPrice = product.precio || "...";
            const productDescription = product.descripción || "...";
            const category = product.categoria || "...";
            const productQuantity = product.cantidad || 1;
            const userId = localStorage.getItem('userId');

            if (category === "Frutas" && product.estado === 'activo') {
                // Clonar el contenido del template
                const productElement = document.importNode(templateContent, true);
                
                // Asignar los valores del producto al template clonado
                productElement.querySelector(".contenedor__imagen img").src = productImage;
                productElement.querySelector(".texto__producto").textContent = category;
                productElement.querySelector(".titulo__producto strong").textContent = productName;
                productElement.querySelector(".precio__producto").textContent = `$${productPrice}`;
                productElement.querySelector(".producto__descripcion p").innerHTML = `<strong>${productName}:</strong> ${productDescription}`;
                const btnDecrementar = productElement.querySelector('.boton__cantidad01');
                const btnIncrementar = productElement.querySelector('.boton__cantidad');
                const inputCantidad = productElement.querySelector('.input__cantidad');
                const botonAgregar = productElement.querySelector('.boton__añadir--link');
                
                // Añadir el nuevo contenedor del producto al elemento productList en el DOM
                productList.appendChild(productElement);

                
                btnDecrementar.addEventListener('click', () => {
                    let cantidadActual = parseInt(inputCantidad.value);
                    if (cantidadActual > 1) {
                        inputCantidad.value = cantidadActual - 1;
                    }
                });

                btnIncrementar.addEventListener('click', () => {
                    let cantidadActual = parseInt(inputCantidad.value);
                    if (cantidadActual < productQuantity) {
                        inputCantidad.value = cantidadActual + 1;
                    }  else {
                        alert('No hay más unidades de este producto.');
                    }
                });

                botonAgregar.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const cantidad = parseInt(inputCantidad.value);
                    
                    const data = {
                        userId: userId, 
                        producto: productName,
                        precio: productPrice,
                        cantidad: cantidad,
                        img: productImage,
                    };

                    try {
                        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
                        let carrito = await response.json();

                        const productoExistente = carrito.find(item => item.producto === data.producto);

                        if (productoExistente) {
                            // Actualiza la cantidad en el producto existente
                            productoExistente.cantidad += data.cantidad;

                            await fetch(`http://localhost:3000/carrito/${productoExistente.id}`, {
                                method: 'PUT',
                                body: JSON.stringify(productoExistente),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            });
                        } else {
                            // Agrega el nuevo producto al carrito
                            await fetch(`http://localhost:3000/carrito?userId=${userId}`, {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            });
                        }

                        alert("Producto agregado al carrito exitosamente");
                        location.reload();
                    } catch (error) {
                        console.error("Error:", error);
                        alert("Ocurrió un error al agregar el producto al carrito.");
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función productos cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", productos);

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