// Validar solo números con límite de 10 dígitos
const solonumeros = (event, elemento) => {
    // Obtener el elemento donde se mostrará el mensaje de error
    const telefono = document.querySelector('#telefono-error');

    // Verificar si la tecla presionada es un número
    // Las teclas numéricas tienen códigos de 48 a 57 en el teclado
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault(); // Evitar que se ingrese el carácter no numérico
        telefono.textContent = 'No se permiten letras, solo números.'; // Mostrar mensaje de error si el carácter no es un número
        elemento.classList.add('error'); // Agregar clase de error al campo
        elemento.classList.remove('correcto'); // Quitar clase de correcto del campo
        return; // Salir de la función para evitar procesar más código
    }

    // Agregar un evento de entrada para validar el campo en tiempo real
    elemento.addEventListener("input", () => {
        const value = elemento.value; // Obtener el valor actual del campo

        // Verificar si el número tiene exactamente 10 dígitos
        const numeroCorrecto = value.length === 10;
        // Verificar si el número tiene más de 10 dígitos
        const masDe10Digitos = value.length > 10;

        // Actualizar el mensaje de error en función de la longitud del número
        // Si el número tiene más de 10 dígitos, mostrar un mensaje específico para ello
        // Si el número tiene 10 dígitos, no mostrar mensaje de error
        // En este caso, la condición es masDe10Digitos, que es una variable booleana que indica si el número de dígitos en el campo de entrada es mayor de 10.
        telefono.textContent = masDe10Digitos 
            ? 'El número de teléfono no puede tener más de 10 dígitos.' // Mensaje si el número tiene más de 10 dígitos
            : 'El número de teléfono debe tener exactamente 10 dígitos.'; // Mensaje si el número tiene menos de 10 dígitos

        // Actualizar las clases del campo dependiendo de la validez del número
        if (numeroCorrecto) {
            telefono.textContent = ''; // Limpiar mensaje de error si el número es correcto
            elemento.classList.remove('error'); // Quitar clase de error
            elemento.classList.add('correcto'); // Añadir clase de correcto
        } else {
            elemento.classList.add('error'); // Agregar clase de error si el número no es correcto
            elemento.classList.remove('correcto'); // Quitar clase de correcto
        }
    });
};

export default solonumeros;





