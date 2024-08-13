import { solicitud_usuarios } from "../../modulos/solicitud.js"; // Asegúrate de ajustar la ruta si es necesario

// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const form = document.getElementById('update-form');
const estadoCuentaSelect = document.getElementById('estado_cuenta');

// Función para cargar los datos del usuario y llenar el formulario
const cargarDatosUsuario = async () => {
    try {
        const usuarios = await solicitud_usuarios();
        const usuario = usuarios.find(user => user.id === parseInt(userId, 10));

        if (usuario) {
            estadoCuentaSelect.value = usuario.estado_cuenta || 'activo';
        } else {
            console.error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
    }
};

// Función para actualizar el estado del usuario
const actualizarEstadoUsuario = async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    try {
        const estadoCuenta = estadoCuentaSelect.value;

        const response = await fetch(`http://localhost:3000/users/${userId}`, { // Ajusta la URL según tu estructura
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado_cuenta: estadoCuenta })
        });

        if (response.ok) {
            alert('Estado de cuenta actualizado con éxito');
            window.location.href = 'listar.html'; // Redirigir a la lista de usuarios
        } else {
            console.error('Error al actualizar el estado del usuario');
        }
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
    }
};

// Cargar los datos del usuario al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosUsuario);

// Manejar el envío del formulario
form.addEventListener('submit', actualizarEstadoUsuario);