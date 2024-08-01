// Validar la contraseña
const validarContraseña = (event, elemento) => {
    const validar = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    const mensaje = 'La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.';

    if (elemento.value === "") {
        // Si el campo está vacío, simplemente marca como error sin mensaje
        elemento.classList.remove("correcto");
        elemento.classList.add("error");
    } else if (validar.test(elemento.value)) {
        // Si la contraseña es válida
        elemento.classList.remove("error"); // Quita la clase de error
        elemento.classList.add("correcto"); // Añade la clase de correcto
    } else {
        // Si la contraseña no es válida
        event.preventDefault(); // Evita el envío del formulario
        elemento.classList.remove("correcto"); // Quita la clase de correcto
        elemento.classList.add("error"); // Añade la clase de error
        alert(mensaje); // Muestra el mensaje de error
    }
};

export default validarContraseña;
