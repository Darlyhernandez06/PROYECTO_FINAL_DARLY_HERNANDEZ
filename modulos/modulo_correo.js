// Función para validar el correo electrónico en tiempo real
const correoelectronico = (event, elemento) => {
    // Seleccionar el elemento HTML donde se mostrará el mensaje de error
    const correoError = document.getElementById('correo-error'); // Obtener el elemento con el ID 'correo-error', que se usa para mostrar el mensaje de error del correo electrónico
    
    // Expresión regular para validar el formato del correo electrónico
    // - `^` al inicio asegura que la coincidencia comience desde el inicio de la cadena.
    // - `[\w-._+]+` coincide con una o más letras, dígitos, guiones bajos (_), puntos (.), guiones (-) o signos más (+) en la primera parte del correo electrónico antes de la arroba (@).
    // - `@` coincide con el símbolo de arroba (@) que separa la parte local del dominio del correo electrónico.
    // - `[\w-._+]+` coincide con una o más letras, dígitos, guiones bajos (_), puntos (.), guiones (-) o signos más (+) en la parte del dominio del correo electrónico antes del punto (.) final.
    // - `\.` coincide con el punto (.) que precede a la extensión del dominio.
    // - `[a-zA-Z]{2,}` coincide con al menos dos letras (mayúsculas o minúsculas) en la extensión del dominio, asegurando que la extensión del dominio tenga al menos dos caracteres.
    // - `$` al final asegura que la coincidencia termine al final de la cadena.
    
    const validarcorreo = /^[\w-._+]+@[\w-._+]+\.[a-zA-Z]{2,}$/; // Expresión regular que valida si el correo electrónico tiene un formato correcto (ejemplo@dominio.com)
    
    // Verificar si el campo de correo electrónico está vacío
    if (elemento.value === "") { // Si el valor del campo de correo electrónico es una cadena vacía
        // Si el campo está vacío, se marca como error sin mostrar un mensaje
        elemento.classList.remove("correcto"); // Quitar la clase 'correcto' si está presente
        elemento.classList.add("error"); // Añadir la clase 'error' para indicar que el campo no es válido
        correoError.textContent = ''; // Limpiar cualquier mensaje de error que se muestre actualmente
    } else if (validarcorreo.test(elemento.value)) { // Si el campo no está vacío y el valor cumple con el formato de correo electrónico
        // Si el correo electrónico cumple con el formato requerido
        elemento.classList.remove("error"); // Quitar la clase 'error' si está presente
        elemento.classList.add("correcto"); // Añadir la clase 'correcto' para indicar que el campo es válido
        correoError.textContent = ''; // Limpiar el mensaje de error
    } else { // Si el campo no está vacío pero el valor no cumple con el formato de correo electrónico
        // Si el correo electrónico no cumple con el formato requerido
        elemento.classList.remove("correcto"); // Quitar la clase 'correcto' si está presente
        elemento.classList.add("error"); // Añadir la clase 'error' para indicar que el campo no es válido
        correoError.textContent = 'El correo electrónico ingresado no es válido. El formato correcto es (ejemplo@dominio.com).'; // Mostrar mensaje de error indicando que el formato 
        // del correo electrónico es incorrecto
    }
};

// Obtener el elemento HTML del campo de correo electrónico
const correoElemento = document.getElementById('correo'); // Obtener el elemento con el ID 'correo', que es el campo de entrada para el correo electrónico

// Agregar un evento de entrada (input) al campo de correo electrónico para validar en tiempo real
correoElemento.addEventListener('input', (event) => correoelectronico(event, correoElemento)); // Escuchar el evento 'input' en el campo de correo electrónico y llamar a la función 
// 'correoelectronico' con el evento y el campo como parámetros

export default correoelectronico; 


