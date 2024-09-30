// IMPORTACIONES
import remover from "../productos actualizaciones/modulos_validaciones/validarremover.js"; // Importa el módulo para eliminar mensajes de error o clases de los campos.
import validarSoloLetras from "../productos actualizaciones/modulos_validaciones/validarSoloLetras.js"; // Importa el módulo que valida que solo se ingresen letras.
import validarSoloNumeros from "../productos actualizaciones/modulos_validaciones/validarSoloNumeros.js"; // Importa el módulo que valida que solo se ingresen números.
import validarDescripcion from "../productos actualizaciones/modulos_validaciones/validarDescripcion.js"; // Importa el módulo que valida la descripción del producto.
import validarSelect from "../productos actualizaciones/modulos_validaciones/validarSelect.js"; // Importa el módulo que valida la selección de opciones en un elemento select.

// VARIABLES
const nombre = document.querySelector('#product-name'); // Selecciona el campo de entrada para el nombre del producto.
const descripcion = document.querySelector('#product-description'); // Selecciona el campo de entrada para la descripción del producto.
const precio = document.querySelector('#product-price'); // Selecciona el campo de entrada para el precio del producto.
const cantidad = document.querySelector('#product-quantity'); // Selecciona el campo de entrada para la cantidad del producto.
const imagen = document.querySelector('#productImage'); // Selecciona el campo de entrada para la URL de la imagen del producto.
const categorias = document.querySelector('#productCategory'); // Selecciona el campo de entrada para la categoría del producto.

// EVENTOS DE VALIDACIÓN EN TIEMPO REAL
// Itera sobre todos los elementos de entrada seleccionados y agrega un evento de 'blur' para cada uno.
[nombre, descripcion, precio, cantidad, imagen, categorias].forEach(input => {
    input.addEventListener("blur", () => {
        remover(input); // Llama a la función 'remover' para quitar mensajes de error cuando el campo pierde el foco.
    });
});

// Agrega un evento de 'input' al campo de nombre que valida la entrada en tiempo real.
nombre.addEventListener("input", (event) => {
    validarSoloLetras(event, nombre); // Valida que solo se ingresen letras en el campo de nombre.
});

// Agrega un evento de 'input' al campo de cantidad que valida la entrada en tiempo real.
cantidad.addEventListener("input", (event) => {
    validarSoloNumeros(event, cantidad); // Valida que solo se ingresen números en el campo de cantidad.
});

// Agrega un evento de 'input' al campo de precio que valida la entrada en tiempo real.
precio.addEventListener("input", (event) => {
    validarSoloNumeros(event, precio); // Valida que solo se ingresen números en el campo de precio.
});

// Agrega un evento de 'input' al campo de descripción que valida la entrada en tiempo real.
descripcion.addEventListener("input", (event) => {
    validarDescripcion(event, descripcion); // Valida la entrada en el campo de descripción.
});

// Agrega un evento de 'input' al campo de categorías que valida la entrada en tiempo real.
categorias.addEventListener("input", (event) => {
    validarSelect(event, categorias); // Valida la selección en el campo de categorías.
});
