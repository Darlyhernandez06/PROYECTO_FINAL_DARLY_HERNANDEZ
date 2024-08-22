// Función asíncrona para cargar y mostrar los productos del carrito del usuario
async function Carrito() {
    try {
        // Obtener el ID del usuario desde el almacenamiento local
        const userId = localStorage.getItem('userId');
        console.log("userId desde localStorage:", userId);

        // Realizar una solicitud para obtener los productos del carrito del usuario desde el servidor
        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
        // Convertir la respuesta de la solicitud en formato JSON
        const carrito = await response.json(); 

        // Seleccionar los elementos del DOM donde se mostrarán los productos y el total del carrito
        const carritoProductos = document.querySelector("#carritoProductos");
        const totalElement = document.querySelector("#total");

        // Limpiar el contenido actual del carrito antes de cargar los nuevos productos
        carritoProductos.innerHTML = '';
        // Inicializar una variable para acumular el total del carrito
        let total = 0; 

        // Verificar si el carrito está vacío
        if (carrito.length === 0) {
            // Seleccionar el template para mostrar cuando el carrito está vacío
            const carritoTemplate = document.querySelector("#carritoTemplate");
            // Clonar el contenido del template
            const emptyCartClone = document.importNode(carritoTemplate.content, true);
            // Añadir el template clonado al contenedor de productos del carrito
            carritoProductos.appendChild(emptyCartClone);

            // Limpiar el total mostrado si el carrito está vacío
            totalElement.innerHTML = ''; 
        } else {
            // Seleccionar el template para los productos
            const productTemplate = document.querySelector("#productTemplate");

            // Iterar sobre cada producto en el carrito
            carrito.forEach(product => {
                // Clonar el contenido del template para un producto
                const clone = document.importNode(productTemplate.content, true);

                // Rellenar el contenido del template con los datos del producto
                clone.querySelector(".producto__imagen img").src = product.img; // Establecer la imagen del producto
                clone.querySelector(".producto__imagen img").alt = product.producto; // Establecer el texto alternativo de la imagen
                clone.querySelector(".producto__nombre").textContent = product.producto; // Establecer el nombre del producto
                clone.querySelector(".producto__precio").textContent = `Precio: $${product.precio}`; // Establecer el precio del producto
                clone.querySelector(".producto__cantidad").textContent = `Cantidad: ${product.cantidad}`; // Establecer la cantidad del producto
                // Seleccionar el botón de eliminar del producto
                const deleteButton = clone.querySelector(".boton__eliminar");
                // Establecer el ID del producto en el atributo data-id del botón
                deleteButton.setAttribute("data-id", product.id);

                // Añadir el producto clonado al contenedor de productos del carrito
                carritoProductos.appendChild(clone);

                // Calcular el total acumulado del carrito
                total += product.precio * product.cantidad;
                // Mostrar el total actualizado en el DOM
                totalElement.innerHTML = "Total: $" + total;
            });

            // Añadir un evento de clic a cada botón de eliminar
            document.querySelectorAll('.boton__eliminar').forEach(button => {
                button.addEventListener('click', async (e) => {
                    // Obtener el ID del producto desde el atributo data-id del botón clicado
                    const productId = e.currentTarget.getAttribute('data-id');
                    const userId = localStorage.getItem('userId');

                    try {
                        // Realizar una solicitud para eliminar el producto del carrito en el servidor
                        await fetch(`http://localhost:3000/carrito/${productId}`, {
                            method: 'DELETE',
                        });

                        // Actualizar el carrito después de eliminar el producto
                        await Carrito();
                    } catch (error) {
                        // Manejar cualquier error que ocurra durante la eliminación
                        console.error('Error al eliminar el producto:', error);
                    }
                });
            });
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la carga de los productos del carrito
        console.error('Error al cargar los productos del carrito:', error);
    }
}

// Llamar a la función Carrito cuando el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", Carrito);



// Función para generar y descargar un PDF con la factura
function generarPDF() {
    // Crear un array para almacenar los productos obtenidos del DOM
    const productos = [];
    // Seleccionar todos los elementos de producto en el DOM
    const productosDOM = document.querySelectorAll("#carritoProductos .producto");

    // Iterar sobre cada elemento de producto en el DOM
    productosDOM.forEach((productoDOM) => {
        // Obtener el nombre, precio y cantidad del producto desde el DOM
        const nombre = productoDOM.querySelector(".producto__nombre").textContent;
        const precio = parseFloat(productoDOM.querySelector(".producto__precio").textContent.replace("Precio: $", ""));
        const cantidad = parseInt(productoDOM.querySelector(".producto__cantidad").textContent.replace("Cantidad: ", ""));
        // Agregar los datos del producto al array
        productos.push({ nombre, precio, cantidad });
    });

    // Calcular el total de los productos
    const total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    // Crear una nueva instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: 'letter' // Configurar el tamaño del documento a carta
    });

    // Definir las rutas de las imágenes a incluir en el PDF
    const logo = "../../imagenes/logo.png"; // Ruta de la imagen del logo
    const fondo = "../../imagenes/fondo.jpg"; // Ruta de la imagen de fondo

    // Añadir las imágenes al PDF
    doc.addImage(fondo, 'JPG', 0, 0, 260, 280); // Imagen de fondo
    doc.addImage(logo, 'PNG', 98, 6, 20, 20); // Imagen del logo

    // Configurar el título del documento
    doc.setFontSize(26);
    doc.setTextColor("#ff9933"); // Color del texto para el título
    doc.text("FACTURA", 20, 40); // Añadir el texto del título

    // Añadir la información del negocio y de la factura
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Megapaquetes", 20, 60); // Nombre del negocio
    doc.text("Carrera 9 #30-14 — La cumbre", 20, 70); // Dirección del negocio
    doc.text("3187800946 - Megapaquetesalego12@gmail.com", 20, 80); // Contacto del negocio

    doc.text("DATE: " + new Date().toLocaleDateString(), 150, 60); // Fecha de la factura
    doc.text("Factura# 004513", 150, 70); // Número de la factura

    // Crear la tabla de productos
    let y = 100; // Posición vertical inicial para la tabla
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("Descripcion", 20, y); // Columna de descripción
    doc.text("Precio", 100, y); // Columna de precio
    doc.text("Cantidad", 130, y); // Columna de cantidad
    doc.text("Total", 160, y); // Columna de total

    // Dibujar una línea divisora
    doc.setDrawColor(0, 0, 0);
    doc.line(20, y + 5, 180, y + 5);

    // Iterar sobre los productos para mostrarlos en la tabla del PDF
    productos.forEach((producto, index) => {
        y += 20; // Mover hacia abajo para la siguiente fila
        doc.text(producto.nombre, 20, y); // Descripción del producto
        doc.text(`$${producto.precio.toFixed(2)}`, 100, y); // Precio del producto
        doc.text(`${producto.cantidad}`, 130, y); // Cantidad del producto
        doc.text(`$${(producto.precio * producto.cantidad).toFixed(2)}`, 160, y); // Total del producto
    });

    // Calcular y mostrar subtotales y totales
    y += 20; // Mover hacia abajo para los subtotales
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Subtotal: ", 130, y); // Subtotal
    doc.text(`$${total.toFixed(2)}`, 160, y); // Valor del subtotal

    y += 10; // Mover hacia abajo para el IVA
    doc.text("IVA: ", 130, y); // IVA
    const iva = total * 0.19; // Calcular el IVA (19%)
    doc.text(`$${iva.toFixed(2)}`, 160, y); // Valor del IVA

    y += 10; // Mover hacia abajo para el costo de envío
    doc.text("Envio: ", 130, y); // Costo de envío
    const envio = 15000; // Valor del envío
    doc.text(`$${envio.toFixed(2)}`, 160, y); // Valor del envío

    y += 10; // Mover hacia abajo para el total final
    doc.setFontSize(14);
    doc.setTextColor("#ff9933");
    doc.text("Total: ", 130, y); // Total final
    doc.text(`$${(total + iva + envio).toFixed(2)}`, 160, y); // Valor del total final

    // Descargar el PDF con el nombre 'factura.pdf'
    doc.save("factura.pdf");
}

// Vincular la función generarPDF al clic en el botón de "Finalizar Compra"
document.querySelector("#botonFinalizarCompra").addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    generarPDF(); // Llamar a la función para generar y descargar el PDF
});

