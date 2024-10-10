// IMPORTANCIONES
import solicitud, { enviar } from "../../modulos/solicitud.js";

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

                productoEnStock.cantidad += productoVendido.cantidad;
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

// Función para actualizar el estado de la factura
const actualizarEstadoFactura = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const estadoFacturaSelect = document.querySelector('#estado_factura').value;
    const pedidoId = new URLSearchParams(window.location.search).get('id');

    try {
        // Primero, obtén la factura actual para saber qué productos se vendieron
        const responseFactura = await fetch(`http://localhost:3000/factura/${pedidoId}`);
        const factura = await responseFactura.json();

        // Actualiza el estado de la factura
        const responseActualizar = await fetch(`http://localhost:3000/factura/${pedidoId}`, {
            method: 'PATCH', // Usar PATCH para actualizar parcialmente
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado_factura: estadoFacturaSelect })
        });

        if (responseActualizar.ok) {
            alert('Estado del pedido actualizado correctamente.');

            // Si el estado de la factura es "Cancelado", actualiza el stock
            if (estadoFacturaSelect === "Su pedido ha sido cancelado.") {
                await actualizarStock(factura.productos);
                alert('Stock actualizado correctamente debido a la cancelación.');
            }

            // Redirigir de vuelta a la lista de facturas
            window.location.href = 'listar.html';
        } else {
            alert('Error al actualizar el estado del pedido.');
        }
    } catch (error) {
        console.error('Error al actualizar el estado de la factura:', error);
    }
};

// Llamar a la función cargarDatosFactura cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    const pedidoId = new URLSearchParams(window.location.search).get('id');
    const response = await fetch(`http://localhost:3000/factura/${pedidoId}`);
    const factura = await response.json();
    document.querySelector('#estado_factura').value = factura.estado_factura;

    document.querySelector('#update-pedido-form').addEventListener('submit', actualizarEstadoFactura);
});




