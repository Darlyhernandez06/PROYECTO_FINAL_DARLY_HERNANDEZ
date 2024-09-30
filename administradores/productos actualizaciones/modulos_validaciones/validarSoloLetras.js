// Validar solo letras y espacios con límite de 30 caracteres
// Definición de la función validarSoloLetras que toma dos parámetros:
// - event: el evento de teclado que se dispara cuando el usuario presiona una tecla.
// - elemento: el elemento HTML (por ejemplo, un campo de entrada) que se está validando.
const validarSoloLetras = (event, elemento) => {
    // Obtener el elemento donde se mostrará el mensaje de error correspondiente
    const mensajeError = document.querySelector(`#error_nombre_producto`);

    // Expresión regular para validar que solo se permiten letras y espacios
    // Incluye letras en mayúsculas y minúsculas, así como caracteres acentuados
    // - `^` al inicio asegura que la coincidencia comience desde el inicio de la cadena.
    // - `[a-zA-ZÀ-ÿ\s]*` coincide con cualquier número de letras (mayúsculas o minúsculas) y espacios, incluyendo letras acentuadas en español (desde À hasta ÿ).
    //   - `a-zA-Z` permite todas las letras del alfabeto inglés, tanto mayúsculas como minúsculas.
    //   - `À-ÿ` incluye letras acentuadas y caracteres especiales utilizados en español y otros idiomas europeos.
    //   - `\s` permite espacios en blanco, incluyendo espacios, tabulaciones y otros caracteres de espacio.
    //   - `*` permite que el patrón anterior (letras y espacios) aparezca cero o más veces, lo que significa que el campo puede estar vacío o contener cualquier cantidad de letras y espacios.
    // - `$` al final asegura que la coincidencia termine al final de la cadena.
    let Letras = /^[a-zA-ZÀ-ÿ\s.,!()]*$/;
    
    // Permitir la eliminación de caracteres
    if (event.key === "Backspace") {
        return; // No hacer nada si se presiona Backspace
    }

    // Validar la entrada del campo en tiempo real
    // Si el carácter ingresado no cumple con la expresión regular (es decir, no es una letra o espacio)
    if (!Letras.test(event.key)) {
        event.preventDefault(); // Evitar la entrada de caracteres no válidos
        mensajeError.textContent = 'El campo solo puede contener letras y espacios.'; // Mostrar mensaje de error
        elemento.classList.add('error'); // Añadir la clase 'error' al campo para aplicar estilos de error
        elemento.classList.remove('correcto'); // Quitar la clase 'correcto' del campo si estaba presente
    } else {
        // Si el carácter ingresado es válido, validar la longitud total del texto
        // Concatenar el valor actual del campo con el nuevo carácter ingresado
        const value = elemento.value + event.key;
        // Verificar si la longitud total del texto es menor o igual a 30 caracteres
        const longitudCorrecta = value.length <= 40;

        if (longitudCorrecta) {
            mensajeError.textContent = ''; // Limpiar el mensaje de error si la longitud es correcta
            elemento.classList.remove('error'); // Quitar la clase 'error' del campo si la longitud es correcta
            elemento.classList.add('correcto'); // Añadir la clase 'correcto' al campo para aplicar estilos de éxito
        } else {
            event.preventDefault(); // Evitar la entrada de caracteres si la longitud excede el límite
            mensajeError.textContent = 'El campo no puede tener más de 40 caracteres.'; // Mostrar mensaje de error
            elemento.classList.add('error'); // Añadir la clase 'error' al campo si la longitud es incorrecta
            elemento.classList.remove('correcto'); // Quitar la clase 'correcto' del campo si estaba presente
        }
    }
};

// Obtener el elemento HTML del campo de cantidad
const nombreElemento = document.querySelector('#product-name');


// Agregar eventos para validar en tiempo real
nombreElemento.addEventListener('keydown', (event) => validarSoloLetras(event, nombreElemento));

// Exportar la función para que pueda ser utilizada en otros archivos
export default validarSoloLetras;