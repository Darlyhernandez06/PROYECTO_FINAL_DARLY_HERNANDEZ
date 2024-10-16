// IMPORTACIONES
import correoelectronico from "../modulos/modulo_correo.js"; // Importa una función que valida el formato del correo electrónico.
import validarContraseña from '../modulos/modulo_contraseña.js'; // Importa una función que valida la complejidad de la contraseña.
import is_valid from "../modulos/modulo_validacion.js"; // Importa una función que valida todos los campos requeridos en el formulario.
import remover from "../modulos/modulo_remover.js"; // Importa una función que agrega o quita clases de validación en los campos de entrada.

// VARIABLES
const $formulario = document.querySelector("form"); // Selecciona el primer elemento <form> en el documento y
// lo almacena en una constante.
const correo = document.querySelector('#correo'); // Selecciona el elemento con id 'correo'
// (campo de entrada para el correo electrónico).
const contraseña = document.querySelector('#contraseña'); // Selecciona el elemento con id 'contraseña' 
// (campo de entrada para la contraseña).

// Agrega un event listener al formulario para manejar el evento de envío
// El evento "submit" se produce cuando un formulario es enviado. Esto ocurre al hacer clic en un botón de 
// tipo "submit" 
// Aquí, event es un objeto que representa la información del evento que se ha producido.
// Cuando se envía el formulario (submit), se llama a la función manejadora que recibe el objeto event.
// Se usa event.preventDefault()
// para evitar que la página se recargue y permitir que el código adicional se ejecute.
$formulario.addEventListener("submit", (event) => {
  event.preventDefault(); // Previene la acción predeterminada del formulario (que recargue la página al enviar).
  
  // Llama a la función is_valid para validar los campos requeridos
  let response = is_valid(event, "form [required]"); // Valida los campos requeridos en el formulario.

  if (response) { // Si la validación es exitosa
    // Crea un objeto con los datos del formulario
    const data = {
      correo: correo.value, // Almacena el valor ingresado en el campo de correo.
      contraseña: contraseña.value // Almacena el valor ingresado en el campo de contraseña.
    };

    // Realiza una solicitud GET a la API para obtener la lista de usuarios
    fetch('http://localhost:3000/users') // Realiza una solicitud a la URL especificada.
      .then(response => response.json()) // Convierte la respuesta de la solicitud a formato JSON.
      .then(users => { // Procesa la lista de usuarios obtenida.
        // Buscar el usuario por correo en la lista de usuarios
        // find es un metodo de los arrays en Javascript que se eutiliza para buscar y encontrar el primer elemento
        // que cumpla con una condicion espeficia
        // notacion de punto
        const user = users.find(user => user.correo === data.correo); // Encuentra el usuario cuyo correo coincide.

        // Verificar si el usuario existe
        if (user) { // Si se encontró un usuario
          // Verificar si la contraseña ingresada es correcta
          if (user.contraseña === data.contraseña) { // Compara la contraseña ingresada con la del usuario.
            // Verificar el estado de la cuenta del usuario
            if (user.estado_cuenta === 'activo') { // Comprueba si la cuenta del usuario está activa.
              // Manejar inicio de sesión exitoso
              if (user.correo === 'Megapaquetesalego12@gmail.com') { // Si el usuario es el administrador
                alert('Login exitoso como administrador'); // Muestra un mensaje de éxito.

                // Almacena información del usuario en localStorage
                // El metodo setItem guarda un valor en el almacenamiento local del navegador asociado a la 
                // clave proporcionada.
                // clave (string) la clave o nombre del valor que se va a guardar
                // valor (string) el valor que se va a guardar

                // ' ':Esta es una cadena de texto que consiste en un solo espacio. Se usa para separar el 
                // nombre y el apellido en la cadena final.
                
                //+:
                // Este operador se utiliza para concatenar (unir) cadenas de texto. En este caso, se está 
                // uniendo el nombre, un espacio y el apellido.
                
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); // Almacena el nombre
                // completo del usuario.
                localStorage.setItem('userType', 'Administrador'); // Almacena el tipo de usuario como 'Administrador'.
                localStorage.setItem('correoLogueado', data.correo); // Almacena el correo del usuario logueado.
                // Redirige a la página principal del administrador
                window.location.href = '../administradores/pagina_principal.html'; // Cambia la ubicación a la página principal del administrador.
              
              } else { // Si es un cliente
                alert('Login exitoso como cliente'); // Muestra un mensaje de éxito.
                // Almacena información del usuario en localStorage
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); // Almacena el nombre completo del cliente.
                localStorage.setItem('userType', 'cliente'); // Almacena el tipo de usuario como 'cliente'.
                localStorage.setItem('correoLogueado', data.correo); // Almacena el correo del cliente logueado.
                localStorage.setItem('userId', user.id); // Almacena el ID del usuario.
                // Redirige a la página principal del cliente
                window.location.href = '../usuarios/pagina_principal.html'; // Cambia la ubicación a la página principal del cliente.
              }
            } else { // Si la cuenta está suspendida
              window.location.href = '../errores/cuenta_suspendida.html'; // Redirige a una página que indica que la cuenta está suspendida.
            }
          } else { // Si la contraseña es incorrecta
            window.location.href = '../errores/error3.html'; // Redirige a una página de error por contraseña incorrecta.
          }
        } else { // Si el correo no existe
          window.location.href = '../errores/error3.html'; // Redirige a una página de error por correo no encontrado.
        }
      })
      .catch(error => { // Manejo de errores en la solicitud
        alert('Ocurrió un error al intentar iniciar sesión'); // Notifica al usuario que ocurrió un error.
        console.error('Error:', error); // Muestra el error en la consola para depuración.
      })
      .finally(() => { // Este bloque se ejecuta siempre al final de la promesa
        document.querySelector("#boton").disabled = false; // Habilita el botón después de la solicitud.
      });

    document.querySelector("#boton").disabled = true; // Deshabilita el botón mientras se procesa la solicitud.
  }
});

// Agrega un event listener a los campos de correo y contraseña para validar al perder el foco
[correo, contraseña].forEach(input => {
  input.addEventListener("blur", () => { // Al perder el foco
    remover(input); // Llama a la función remover para limpiar las clases de validación.
  });
});

// Valida el correo al perder el foco
correo.addEventListener("blur", (event) => {
  correoelectronico(event, correo); // Llama a la función para validar el formato del correo.
});

// Valida la contraseña al perder el foco
contraseña.addEventListener("blur", (event) => {
  validarContraseña(event, contraseña); // Llama a la función para validar la contraseña.
});
