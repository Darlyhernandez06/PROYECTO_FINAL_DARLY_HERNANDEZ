function validarSelect(event, input) {
    const mensajeError = document.querySelector(`#error_select_producto`);
    
    if (input.value === "") { // Verificar si no se seleccionó nada
        mensajeError.textContent = "Debe seleccionar una categoría.";
        input.classList.add("error");
    } else {
        mensajeError.textContent = "";
        input.classList.remove("error");
    }
}

// Obtener el elemento HTML del campo de descripción
const selectElemento = document.querySelector('#productCategory'); // ID del campo de descripción

// Agregar un evento de entrada (input) al campo de descripción para validar en tiempo real
selectElemento.addEventListener('keydown', (event) => validarSelect(event, selectElemento));

// Exportar la función para que pueda ser utilizada en otros archivos
export default validarSelect;