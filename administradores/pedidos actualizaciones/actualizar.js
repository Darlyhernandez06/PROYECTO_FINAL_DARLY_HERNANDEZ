// Función para actualizar el estado de la factura
const actualizarEstadoFactura = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const estadoFacturaSelect = document.querySelector('#estado_factura').value;
    const pedidoId = new URLSearchParams(window.location.search).get('id');

    try {
        const response = await fetch(`http://localhost:3000/factura/${pedidoId}`, {
            method: 'PATCH', // Usar PATCH para actualizar parcialmente
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado_factura: estadoFacturaSelect })
        });

        if (response.ok) {
            alert('Estado del pedido actualizado correctamente.');
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




