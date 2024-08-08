// Función para validar la contraseña en tiempo real
const validarContraseña = (event, elemento) => {
    // Expresión regular para validar la contraseña:
    // - `(?=.*\d)` asegura que haya al menos un dígito.
    // - `(?=.*[A-Z])` asegura que haya al menos una letra mayúscula.
    // - `(?=.*[a-z])` asegura que haya al menos una letra minúscula.
    // - `\S{8,16}` asegura que la longitud de la contraseña sea entre 8 y 16 caracteres, excluyendo espacios.
    const validar = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    
    // Mensaje que se mostrará si la contraseña no cumple con los requisitos de la expresión regular
    const mensaje = 'La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.';
    
    // ID del elemento HTML donde se mostrará el mensaje de error
    const errorId = 'contraseña-error'; // Asegúrate de que este ID coincida con el ID del elemento en el HTML
    // Obtener el elemento HTML por su ID
    const errorElemento = document.getElementById(errorId);

    // Verificar si el campo de contraseña está vacío
    if (elemento.value === "") {
        // Si el campo está vacío, marcar el campo como error y no mostrar mensaje
        elemento.classList.remove("correcto"); // Quitar la clase de "correcto" del campo
        elemento.classList.add("error"); // Añadir la clase de "error" al campo
        errorElemento.textContent = ''; // Limpiar el mensaje de error
    } else if (validar.test(elemento.value)) {
        // Si la contraseña cumple con el formato especificado por la expresión regular
        elemento.classList.remove("error"); // Quitar la clase de "error" del campo
        elemento.classList.add("correcto"); // Añadir la clase de "correcto" al campo
        errorElemento.textContent = ''; // Limpiar el mensaje de error
    } else {
        // Si la contraseña no cumple con el formato especificado por la expresión regular
        elemento.classList.remove("correcto"); // Quitar la clase de "correcto" del campo
        elemento.classList.add("error"); // Añadir la clase de "error" al campo
        errorElemento.textContent = mensaje; // Mostrar el mensaje de error que explica los requisitos de la contraseña
    }
};

// Obtener el elemento HTML del campo de contraseña por su ID
const contraseñaElemento = document.getElementById('contraseña'); // ID del campo de contraseña

// Agregar un evento de entrada (input) al campo de contraseña para validar en tiempo real
contraseñaElemento.addEventListener('input', (event) => validarContraseña(event, contraseñaElemento));

export default validarContraseña;



