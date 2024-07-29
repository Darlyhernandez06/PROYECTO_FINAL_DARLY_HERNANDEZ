// Selecciona el formulario de inicio de sesión
const loginForm = document.querySelector('.from__principal');

// Agrega un manejador de evento para cuando el formulario se envíe
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el envío del formulario para manejarlo con JavaScript

    // Obtiene el valor del correo electrónico y la contraseña del formulario
    const correo = document.querySelector('#username').value;
    const contraseña = document.querySelector('#contraseña').value;

    // Obtiene la lista de usuarios del local storage o inicializa como un arreglo vacío si no existe
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Busca un usuario que coincida con el correo y la contraseña proporcionados
    const user = users.find(user => user.correo === correo && user.contraseña === contraseña);

    // Si no se encuentra un usuario, muestra un mensaje de error y detiene la ejecución
    if (!user) {
        alert('Credenciales incorrectas');
        return;
    }

    // Guarda el usuario autenticado en el local storage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redirige a diferentes páginas según las credenciales del usuario
    if (correo === 'admin@gmail.com' && contraseña === '123') {
        window.location.href = '../admin/productos/listar.html'; // Página para admin
    } else {
        window.location.href = '../productos/frutas_productos.html'; // Página para clientes
    }
});

// Agrega un manejador de evento para cuando el contenido de la página se haya cargado completamente
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario y los campos de correo electrónico y contraseña
    const form = document.querySelector('.from__principal');
    const email = document.querySelector('#username');
    const password = document.querySelector('#contraseña');

    // Agrega un manejador de evento para cuando el formulario se envíe
    form.addEventListener('submit', function(event) {
        let valid = true; // Variable para controlar si el formulario es válido

        // Resetea los mensajes de error y los estilos de los campos
        email.classList.remove('error');
        password.classList.remove('error');
        document.querySelectorAll('.error-message').forEach(function(element) {
            element.style.display = 'none';
            email.style.border='green solid 2px'; // Resetea el estilo del borde del correo electrónico
        });

        // Valida el correo electrónico utilizando una expresión regular
        if (!validateEmail(email.value)) {
            email.classList.add('error'); // Agrega una clase de error si el correo es inválido
            document.querySelector('#email-error').style.display = 'block'; // Muestra el mensaje de error
        }

        // Valida que la contraseña tenga al menos 8 caracteres
        if (password.value.length < 8) {
            password.classList.add('error'); // Agrega una clase de error si la contraseña es corta
            document.querySelector('#password-error').style.display = 'block'; // Muestra el mensaje de error
        }
    });

    // Función para validar el correo electrónico utilizando una expresión regular
    function validateEmail(email) {
        const re = /^[\w-._+]+@[\w-._+]+(\.[a-zA-Z]{2,4}){1,2}$/; // Expresión regular para validar correos electrónicos
        return re.test(String(email).toLowerCase()); // Retorna true si el correo es válido, false en caso contrario
    }
});

// - find: Método para buscar un elemento en un array que cumpla con una condición dada.
// - String.toLowerCase(): Método para convertir todos los caracteres de una cadena a minúsculas.