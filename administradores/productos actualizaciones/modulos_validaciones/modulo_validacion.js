// Función de validación
const is_valid = (event, form) => {
  const elementos = document.querySelectorAll(form);
  let todosLlenos = true; // Asumimos que todos los campos están llenos inicialmente

  elementos.forEach(elemento => {
    // Validación general para los campos
    if (elemento.value.trim() === "") {  // `trim()` para evitar que espacios cuenten como valor
      elemento.classList.add("error");   // Si el campo está vacío, agrega la clase "error"
      elemento.classList.remove("correcto"); // Remueve la clase "correcto" si estaba presente
      todosLlenos = false; // Indica que hay campos sin llenar
    } else {
      elemento.classList.remove("error"); // Remueve la clase "error" si el campo está lleno
      elemento.classList.add("correcto"); // Agrega la clase "correcto" si el campo está lleno
    }
  });

  // Si hay campos vacíos, se retorna `false`
  return todosLlenos; // Retorna el resultado de la validación
};

export default is_valid;

  

// Uso: element.classList.contains('nombre-de-clase')
// Propósito: Verificar si un elemento HTML tiene una clase específica.
// Retorna: true si el elemento tiene la clase; false si no la tiene.