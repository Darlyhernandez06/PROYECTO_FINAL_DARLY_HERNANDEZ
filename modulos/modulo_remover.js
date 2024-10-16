// Función que agrega o quita la clase correcto dependiendo de si el campo tiene un valor
const remover = (input) => {
    
    // La función 'remover' toma un parámetro 'input', que se espera que sea un elemento de entrada (input) de un formulario.
     

    // Verifica si el valor del campo de entrada no está vacío
    if (input.value !== "") {
        // Si el campo tiene un valor, añade la clase 'correcto'
        input.classList.add("correcto"); // Añade la clase correcto
        
        // También quita la clase 'error' en caso de que esté presente
        input.classList.remove("error"); // Quita la clase error
        
    } else {
        // Si el campo está vacío, quita la clase 'correcto'
        input.classList.remove("correcto");
        
        // Y añade la clase 'error'
        input.classList.add("error");
    }
};

// Exportación de la función 'remover' como el valor por defecto del módulo
export default remover;

// 'export default remover;' permite que esta función sea importada en otros módulos de la aplicación, 
// facilitando su reutilización en diferentes contextos donde se necesite validar la entrada de un formulario.