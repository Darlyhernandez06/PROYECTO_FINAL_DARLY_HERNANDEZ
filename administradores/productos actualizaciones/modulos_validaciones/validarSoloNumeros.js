// Validar solo números con límite de 10 dígitos
// Definición de la función validarSoloNumeros que toma dos parámetros:
// - event: el evento de teclado que se dispara cuando el usuario presiona una tecla.
// - elemento: el elemento HTML (por ejemplo, un campo de entrada) que se está validando.
const validarSoloNumeros = (event, elemento) => {
    // Obtener el elemento donde se mostrará el mensaje de error correspondiente
    // Esta línea usa el operador ternario (? :) para decidir qué elemento HTML seleccionar en función del valor de elemento.id.
    // Si el id del elemento es 'cantidad_producto', entonces selecciona el elemento con el ID #error_cantidad_producto.
    // Si no es 'cantidad_producto', selecciona el elemento con el ID #error_precio_producto.
    const mensajeError = elemento.id === 'product-quantity' ? 
        document.querySelector(`#error_cantidad_producto`) : 
        document.querySelector(`#error_precio_producto`);


    // Verificar si la tecla presionada es un número
    // Las teclas numéricas tienen códigos de 48 a 57 en el teclado
    // event.keyCode es una propiedad que se usaba en JavaScript para identificar la tecla específica que fue presionada en un evento de teclado. 
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault(); // Evitar que se ingrese el carácter no numérico
        mensajeError.textContent = 'No se permiten letras, solo números.'; // Mostrar mensaje de error si el carácter no es un número
        elemento.classList.add('error'); // Agregar clase de error al campo
        elemento.classList.remove('correcto'); // Quitar clase de correcto del campo
        return; // Salir de la función para evitar procesar más código
    } else {
        mensajeError.textContent = ''; // Limpiar mensaje de error si es correcto
        elemento.classList.remove('error'); // Quitar clase de error
        elemento.classList.add('correcto'); // Añadir clase de correcto
    } 
};

// Obtener el elemento HTML del campo de cantidad
const cantidadElemento = document.querySelector('#product-quantity');

// Obtener el elemento HTML del campo de precio
const precioElemento = document.querySelector('#product-price');

// Agregar eventos para validar en tiempo real
cantidadElemento.addEventListener('keypress', (event) => validarSoloNumeros(event, cantidadElemento));
precioElemento.addEventListener('keypress', (event) => validarSoloNumeros(event, precioElemento));

// Exportar la función para que pueda ser utilizada en otros archivos
export default validarSoloNumeros;