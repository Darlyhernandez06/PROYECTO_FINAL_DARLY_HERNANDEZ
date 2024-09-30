// Función que agrega o quita la clase "correcto" o "error" dependiendo de si el campo tiene un valor
const remover = (input) => {
    // Si el campo de entrada no está vacío
    if (input.value !== "") {
        input.classList.add("correcto"); // Añade la clase "correcto" si el campo tiene algún valor
        input.classList.remove("error"); // Quita la clase "error" para indicar que no hay errores
    } else {
        // Si el campo está vacío
        input.classList.remove("correcto"); // Remueve la clase "correcto" si el campo está vacío
        input.classList.add("error"); // Añade la clase "error" para resaltar el error en el campo vacío
    }
};

export default remover;