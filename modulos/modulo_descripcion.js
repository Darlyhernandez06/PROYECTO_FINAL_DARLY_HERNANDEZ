// Expresión regular para validar una descripción con un límite de 200 caracteres
// - `^` al inicio asegura que la coincidencia comience desde el inicio de la cadena.
// - `.{1,200}` permite cualquier carácter (excepto saltos de línea) desde 1 hasta 200 veces.
//   - `.` coincide con cualquier carácter individual (letras, números, símbolos, espacios, etc.)
//   - `{1,200}` especifica que el carácter puede repetirse de 1 a 200 veces, lo que limita la longitud del texto a un máximo de 200 caracteres.
// - `$` al final asegura que la coincidencia termine al final de la cadena.
const regexDescripcion = /^.{1,200}$/;

const validarDescripcion = (event, elemento) => {
    // Seleccionar el elemento HTML donde se mostrará el mensaje de error
    const descripcionError = document.getElementById('descripcion-error'); // ID del elemento para el mensaje de error

    // Número máximo de caracteres permitidos
    const maxCaracteres = 200;

    // Validar la longitud del texto en tiempo real usando la expresión regular
    if (!regexDescripcion.test(elemento.value)) {
        // Si el texto no cumple con la expresión regular (es decir, tiene más de 200 caracteres)
        elemento.classList.add("error"); // Añadir clase de error al campo
        elemento.classList.remove("correcto"); // Quitar clase de correcto del campo
        descripcionError.textContent = `La descripción no puede tener más de ${maxCaracteres} caracteres.`; // Mostrar mensaje de error
    } else {
        // Si el texto cumple con la expresión regular (es decir, tiene 200 caracteres o menos)
        elemento.classList.remove("error"); // Quitar clase de error del campo
        elemento.classList.add("correcto"); // Añadir clase de correcto al campo
        descripcionError.textContent = ''; // Limpiar mensaje de error
    }
};

// Obtener el elemento HTML del campo de descripción
const descripcionElemento = document.getElementById('descripcion'); // ID del campo de descripción

// Agregar un evento de entrada (input) al campo de descripción para validar en tiempo real
descripcionElemento.addEventListener('input', (event) => validarDescripcion(event, descripcionElemento));

// Exportar la función para que pueda ser utilizada en otros archivos
export default validarDescripcion;

