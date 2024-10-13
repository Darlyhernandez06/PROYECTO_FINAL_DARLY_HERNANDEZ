// IMPORTANCIONES
import solicitud, { enviar } from "../../modulos/solicitud.js";

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
export function generarPDF(factura) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: 'letter' // Configurar el tamaño del documento a carta
    });

    const logo = "../../imagenes/logo.png"; // Ruta de la imagen del logo
    const fondo = "../../imagenes/fondo.jpg"; // Ruta de la imagen de fondo

    doc.addImage(fondo, 'JPG', 0, 0, 260, 280); // Imagen de fondo
    doc.addImage(logo, 'PNG', 98, 6, 20, 20); // Imagen del logo

    doc.setFontSize(26);
    doc.setTextColor("#ff9933"); // Color del texto para el título
    doc.text("FACTURA", 20, 40); // Añadir el texto del título

    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Megapaquetes", 20, 60); // Nombre del negocio
    doc.text("Carrera 9 #30-14 — La cumbre", 20, 70); // Dirección del negocio
    doc.text("3187800946 - Megapaquetesalego12@gmail.com", 20, 80); // Contacto del negocio

    doc.text("DATE: " + factura.fecha, 150, 60); // Fecha de la factura
    doc.text(`Factura# ${factura.numero}`, 150, 70); // Número de la factura

    // Crear la tabla de productos
    let y = 100; // Posición vertical inicial para la tabla
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("Descripcion", 20, y); // Columna de descripción
    doc.text("Precio", 100, y); // Columna de precio
    doc.text("Cantidad", 130, y); // Columna de cantidad
    doc.text("Total", 160, y); // Columna de total

    doc.setDrawColor(0, 0, 0);
    doc.line(20, y + 5, 180, y + 5);

    factura.productos.forEach((producto) => {
        y += 20; // Mover hacia abajo para la siguiente fila
        doc.text(producto.nombre, 20, y); // Descripción del producto
        doc.text(`$${producto.precio.toFixed(0)}`, 100, y); // Precio del producto
        doc.text(`${producto.cantidad}`, 130, y); // Cantidad del producto
        doc.text(`$${(producto.precio * producto.cantidad).toFixed(0)}`, 160, y); // Total del producto
    });

    y += 20; // Mover hacia abajo para los subtotales
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Subtotal: ", 130, y); // Subtotal
    doc.text(`$${factura.subtotal.toFixed(0)}`, 160, y); // Valor del subtotal

    y += 10; // Mover hacia abajo para el IVA
    doc.text("IVA: ", 130, y); // IVA
    doc.text(`$${factura.iva.toFixed(0)}`, 160, y); // Valor del IVA

    y += 10; // Mover hacia abajo para el costo de envío
    doc.text("Envio: ", 130, y); // Costo de envío
    doc.text(`$${factura.envio.toFixed(0)}`, 160, y); // Valor del envío

    y += 10; // Mover hacia abajo para el total final
    doc.setFontSize(14);
    doc.setTextColor("#ff9933");
    doc.text("Total: ", 130, y); // Total final
    doc.text(`$${(factura.total).toFixed(0)}`, 160, y); // Valor del total final

    doc.save("factura.pdf");
}



// Función para actualizar el stock de los productos en el servidor
async function actualizarStock(productosVendidos) {
    try {
        // Obtener el stock actual de los productos desde el servidor
        const productosStock = await solicitud("productos");
        console.log('Productos en stock:', productosStock);

        // Actualizar las cantidades en el stock
        for (const productoVendido of productosVendidos) {
            const productoEnStock = productosStock.find(producto => producto.nombre === productoVendido.nombre);
            if (productoEnStock) {
                console.log('Actualizando cantidad de:', productoEnStock.nombre);
                console.log('Cantidad anterior:', productoEnStock.cantidad);

                productoEnStock.cantidad -= productoVendido.cantidad;
                console.log('Cantidad nueva:', productoEnStock.cantidad);

                // Crear opciones para enviar la actualización individual del producto
                const opciones = {
                    method: 'PUT',
                    body: JSON.stringify(productoEnStock), // Enviar solo el producto actualizado
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };

                // Utilizar la función enviar con el ID del producto
                const respuesta = await enviar(`productos/${productoEnStock.id}`, opciones);
                console.log('Respuesta del servidor para', productoEnStock.nombre, ':', respuesta);
            }
        }
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
    }
}


// Función para guardar la factura en el servidor
async function guardarFactura(factura) {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch('http://localhost:3000/factura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...factura, userId: userId })
        });
        const result = await response.json();
        console.log('Factura guardada exitosamente:', result);

        // Llamar a la función para actualizar el stock con los productos de la factura
        await actualizarStock(factura.productos);
    } catch (error) {
        console.error('Error al guardar la factura:', error);
    }
}


// Función para obtener los datos de la factura y luego generar y guardar la factura
async function generarYGuardarFactura() {
    const productos = [];
    const productosDOM = document.querySelectorAll("#carritoProductos .producto");

    productosDOM.forEach((productoDOM) => {
        const nombre = productoDOM.querySelector(".producto__nombre").textContent;
        const precio = parseFloat(productoDOM.querySelector(".producto__precio").textContent.replace("Precio: $", ""));
        const cantidad = parseInt(productoDOM.querySelector(".producto__cantidad").textContent.replace("Cantidad: ", ""));
        productos.push({ nombre, precio, cantidad });
    });

    const subtotal = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const iva = subtotal * 0.19; // Calcular el IVA (19%)
    const envio = 15000; // Valor del envío
    const total = subtotal + iva + envio;

    const factura = {
        numero: String(Math.floor(Math.random() * 900000) + 100000), // Genera un número entre 100000 y 999999 
        fecha: new Date().toLocaleDateString(),
        subtotal: subtotal,
        iva: iva,
        envio: envio,
        total: total,
        productos: productos,
        estado_factura: "Su pedido se encuentra en revision."
    };

    // Guardar la factura en el servidor y actualizar el stock
    await guardarFactura(factura);

    // Eliminar todos los productos del carrito del usuario
    await eliminarTodosLosProductosDelCarrito();    

    // Generar y descargar el PDF
    generarPDF(factura);
}

// Vincular la función generarYGuardarFactura al clic en el botón de "Finalizar Compra"
document.querySelector("#botonFinalizarCompra").addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    generarYGuardarFactura(); // Llamar a la función para generar y guardar la factura
});



// Función para eliminar todos los productos del carrito del usuario
async function eliminarTodosLosProductosDelCarrito() {
    const userId = localStorage.getItem('userId');

    try {
        // Realizar una solicitud para obtener los productos del carrito del usuario
        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
        const productos = await response.json();

        // Eliminar cada producto del carrito
        const deleteRequests = productos.map(producto => 
            fetch(`http://localhost:3000/carrito/${producto.id}`, {
                method: 'DELETE',
            })
        );

        // Esperar que todas las solicitudes de eliminación se completen
        await Promise.all(deleteRequests);
        console.log('Todos los productos del carrito han sido eliminados.');
        location.reload();
    } catch (error) {
        console.error('Error al eliminar los productos del carrito:', error);
    }
}