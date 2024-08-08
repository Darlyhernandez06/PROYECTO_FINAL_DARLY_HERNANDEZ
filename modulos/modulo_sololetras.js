// Validar solo letras y espacios con límite de 30 caracteres
const sololetras = (event, elemento) => {
    // Seleccionar el mensaje de error correspondiente basado en el ID del elemento
    // Si el ID del elemento es 'nombres', el mensaje de error será 'nombres-error'
    // Si el ID del elemento es 'apellidos', el mensaje de error será 'apellidos-error'
    const errorId = elemento.id === 'nombres' ? 'nombres-error' : 'apellidos-error';
    const letrasError = document.getElementById(errorId);

    // Expresión regular para validar que solo se permiten letras y espacios
    // Incluye letras en mayúsculas y minúsculas, así como caracteres acentuados
    // - `^` al inicio asegura que la coincidencia comience desde el inicio de la cadena.
    // - `[a-zA-ZÀ-ÿ\s]*` coincide con cualquier número de letras (mayúsculas o minúsculas) y espacios, incluyendo letras acentuadas en español (desde À hasta ÿ).
    //   - `a-zA-Z` permite todas las letras del alfabeto inglés, tanto mayúsculas como minúsculas.
    //   - `À-ÿ` incluye letras acentuadas y caracteres especiales utilizados en español y otros idiomas europeos.
    //   - `\s` permite espacios en blanco, incluyendo espacios, tabulaciones y otros caracteres de espacio.
    //   - `*` permite que el patrón anterior (letras y espacios) aparezca cero o más veces, lo que significa que el campo puede estar vacío o contener cualquier cantidad de letras y espacios.
    // - `$` al final asegura que la coincidencia termine al final de la cadena.
let Letras = /^[a-zA-ZÀ-ÿ\s]*$/;


    // Validar la entrada del campo en tiempo real
    // Si el carácter ingresado no cumple con la expresión regular (es decir, no es una letra o espacio)
    if (!Letras.test(event.key)) {
        event.preventDefault(); // Evitar la entrada de caracteres no válidos
        letrasError.textContent = 'El campo solo puede contener letras y espacios.'; // Mostrar mensaje de error
        elemento.classList.add('error'); // Añadir la clase 'error' al campo para aplicar estilos de error
        elemento.classList.remove('correcto'); // Quitar la clase 'correcto' del campo si estaba presente
    } else {
        // Si el carácter ingresado es válido, validar la longitud total del texto
        // Concatenar el valor actual del campo con el nuevo carácter ingresado
        const value = elemento.value + event.key;
        // Verificar si la longitud total del texto es menor o igual a 30 caracteres
        const longitudCorrecta = value.length <= 30;

        if (longitudCorrecta) {
            letrasError.textContent = ''; // Limpiar el mensaje de error si la longitud es correcta
            elemento.classList.remove('error'); // Quitar la clase 'error' del campo si la longitud es correcta
            elemento.classList.add('correcto'); // Añadir la clase 'correcto' al campo para aplicar estilos de éxito
        } else {
            event.preventDefault(); // Evitar la entrada de caracteres si la longitud excede el límite
            letrasError.textContent = 'El campo no puede tener más de 30 caracteres.'; // Mostrar mensaje de error
            elemento.classList.add('error'); // Añadir la clase 'error' al campo si la longitud es incorrecta
            elemento.classList.remove('correcto'); // Quitar la clase 'correcto' del campo si estaba presente
        }
    }
};

export default sololetras;

