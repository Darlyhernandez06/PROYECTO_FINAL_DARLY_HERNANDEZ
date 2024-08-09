// IMPORTANCIONES
import correoelectronico from "../modulos/modulo_correo.js";
import validarContraseña from '../modulos/modulo_contraseña.js';
import is_valid from "../modulos/modulo_validacion.js";
import remover from "../modulos/modulo_remover.js";

// VARIABLES

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Captura los datos introducidos en los campos del formulario
const correo = document.querySelector('#correo');
const contraseña = document.querySelector('#contraseña');

$formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Previene el envío del formulario para manejarlo con JavaScript

    let response = is_valid(event, "form [required]");

    if (response) {
        // Crea un objeto de datos con la información del formulario
        const data = {
            correo: correo.value,
            contraseña: contraseña.value
        };

        // Realiza una solicitud POST al servidor
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(result => {
            // Verifica si la autenticación fue exitosa
            if (result.success) {
                // Guarda el usuario autenticado en el localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(result.user));

                // Redirige a la página correspondiente
                if (result.user.correo === 'admin@gmail.com') {
                    window.location.href = '../admin/productos/listar.html'; // Página para admin
                } else {
                    window.location.href = '../productos/frutas_productos.html'; // Página para clientes
                }
            } else {
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => {
            alert('Ocurrió un error al intentar iniciar sesión');
            console.error('Error:', error);
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilitar el botón
        });

        document.querySelector("#boton").disabled = true; // Deshabilitar el botón
    }
});

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[correo, contraseña].forEach(input => {
    input.addEventListener("blur", () => {
        remover(input);
    });
});

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    correoelectronico(event, correo);
});

// Validación de la contraseña
contraseña.addEventListener("blur", (event) => {
    validarContraseña(event, contraseña);
});


