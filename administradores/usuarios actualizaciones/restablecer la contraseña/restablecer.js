// IMPORTACIONES
import validarContraseña from '../../../modulos/modulo_contraseña.js'; // Importa el módulo para validar contraseñas.
import remover from "../../../modulos/modulo_remover.js"; // Importa el módulo para remover mensajes de error o clases.

// Selecciona los elementos del formulario
const contraseña = document.querySelector('#contraseña');
const confirmarContraseña = document.querySelector('#confrimar__contraseña');
const confirmarError = document.querySelector("#confirmar-error");


// EVENTOS DE VALIDACIÓN EN TIEMPO REAL
// Itera sobre cada uno de los elementos de entrada (inputs) en el array.
[contraseña, confirmarContraseña].forEach(input => {
    
    // Añade un listener de eventos para el evento "blur" a cada elemento de entrada.
    input.addEventListener("blur", () => {
        
        // Llama a la función `remover` pasando el elemento de entrada actual como argumento.
        // La función `remover` se encargará de quitar los mensajes de error asociados con este campo.
        remover(input); 
    });
});


// Validar la confirmación de contraseña
confirmarContraseña.addEventListener("blur", () => {
    if (contraseña.value === confirmarContraseña.value) {
        // Elimina la clase error si las contraseñas coinciden
        contraseña.classList.remove("error");
        confirmarContraseña.classList.remove("error");
        // Añade la clase correcto
        contraseña.classList.add("correcto");
        confirmarContraseña.classList.add("correcto");
        // Limpia el mensaje de error
        confirmarError.textContent = '';
    } else {
        // Agrega la clase error a los campos de contraseña
        contraseña.classList.add("error");
        confirmarContraseña.classList.add("error");
        // Elimina la clase correcto si estaba presente
        contraseña.classList.remove("correcto");
        confirmarContraseña.classList.remove("correcto");
        // Muestra el mensaje de error
        confirmarError.textContent = 'Las contraseñas no coinciden';
    }
});


// Valida la contraseña al perder foco
contraseña.addEventListener("blur", (event) => {
    validarContraseña(event, contraseña); 
});


// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const form = document.querySelector('#restablecer-form');
const contraseñaInput = document.querySelector('#contraseña');
const confirmarContraseñaInput = document.querySelector('#confrimar__contraseña');

// Función para restablecer la contraseña del usuario
const restablecerContraseña = async (event) => {
  event.preventDefault();

  try {
    const contraseña = contraseñaInput.value;
    const confirmarContraseña = confirmarContraseñaInput.value;

    // Validar que se haya ingresado una nueva contraseña
    if (!contraseña) {
      alert('Por favor ingresa una nueva contraseña.');
      return;
    }

    // Validar que la contraseña y su confirmación coincidan
    if (contraseña !== confirmarContraseña) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            contraseña: contraseña,
            confirmarContraseña: confirmarContraseña 
        })
    });

    if (response.ok) {
      window.location.href = '../../../errores/exito_restablecimiento.html'; // Redirigir a la lista de usuarios
    } else {
      console.error('Error al restablecer la contraseña');
    }
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
  }
};

// Manejar el envío del formulario
form.addEventListener('submit', restablecerContraseña);



