// IMPORTACIONES
import { factura } from "../../modulos/solicitud.js";

// Obtener el ID de la factura de la URL
const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get('id');

const form = document.querySelector('#update-pedido-form');
const estadoFacturaSelect = document.querySelector('#estado_factura');

// Función para cargar los datos de la factura y llenar el formulario
const cargarDatosFactura = async () => {
    try {

        const facturas = await factura(); // Obtener la lista de facturas

        const facturaData = facturas.find(item => item.id === pedidoId);

        if (facturaData) {
            estadoFacturaSelect.value = facturaData.estado_factura || 'Pendiente'; 
            document.querySelector('#pedido-id').value = facturaData.id; // Guardar el ID de la factura en el formulario
        } else {
            console.error('Factura no encontrada');
        }
    } catch (error) {
        console.error('Error al cargar los datos de la factura:', error);
    }
};

// Función para actualizar el estado de la factura
const actualizarEstadoFactura = async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    try {

        const estadoFactura = estadoFacturaSelect.value;

        // Enviar la solicitud para actualizar el estado de la factura
        const response = await fetch(`http://localhost:3000/factura/${pedidoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado_factura: estadoFactura })
        });

        alert('Estado de la factura actualizado con éxito');
        window.location.href = 'listar.html'; // Redirigir a la lista de facturas
    } catch (error) {
        console.error('Error al actualizar el estado de la factura:', error);
    }
};

// Cargar los datos de la factura cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarDatosFactura);

// Manejar el envío del formulario
form.addEventListener('submit', actualizarEstadoFactura);




