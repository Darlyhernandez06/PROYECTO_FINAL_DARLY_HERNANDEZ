// IMPORTACIONES
import remover from "../productos actualizaciones/modulos_validaciones/validarremover.js"; // Importa el módulo para eliminar mensajes de error o clases de los campos.
import validarnumero from "../productos actualizaciones/modulos_validaciones/validarnumero.js"; // Importa el módulo que valida que solo se ingresen números.
import validarSelect from "../productos actualizaciones/modulos_validaciones/validarSelect.js"; // Importa el módulo que valida la selección de opciones en un elemento select.

// VARIABLES
const nombre = document.querySelector('#product-name'); // Selecciona el campo de entrada para el nombre del producto..
const precio = document.querySelector('#product-price'); // Selecciona el campo de entrada para el precio del producto.
const imagen = document.querySelector('#productImage'); // Selecciona el campo de entrada para la URL de la imagen del producto.
const categorias = document.querySelector('#productCategory'); // Selecciona el campo de entrada para la categoría del producto.

// EVENTOS DE VALIDACIÓN EN TIEMPO REAL
// Itera sobre todos los elementos de entrada seleccionados y agrega un evento de 'blur' para cada uno.
[nombre, precio, imagen, categorias].forEach(input => {
    input.addEventListener("blur", () => {
        remover(input); // Llama a la función 'remover' para quitar mensajes de error cuando el campo pierde el foco.
    });
});

// Agrega un evento de 'input' al campo de precio que valida la entrada en tiempo real.
precio.addEventListener("input", (event) => {
    validarnumero(event, precio); // Valida que solo se ingresen números en el campo de precio.
});


// Agrega un evento de 'input' al campo de categorías que valida la entrada en tiempo real.
categorias.addEventListener("input", (event) => {
    validarSelect(event, categorias); // Valida la selección en el campo de categorías.
});
