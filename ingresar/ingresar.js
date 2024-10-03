// IMPORTACIONES
import correoelectronico from "../modulos/modulo_correo.js";
import validarContraseña from '../modulos/modulo_contraseña.js';
import is_valid from "../modulos/modulo_validacion.js";
import remover from "../modulos/modulo_remover.js";

// VARIABLES
const $formulario = document.querySelector("form");
const correo = document.querySelector('#correo');
const contraseña = document.querySelector('#contraseña');

$formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let response = is_valid(event, "form [required]");

  if (response) {
    const data = {
      correo: correo.value,
      contraseña: contraseña.value
    };

    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        // Buscar el usuario por correo
        const user = users.find(user => user.correo === data.correo);

        // Verificar si el usuario existe
        if (user) {
          // Verificar si la contraseña es correcta
          if (user.contraseña === data.contraseña) {
            // Verificar el estado de la cuenta
            if (user.estado_cuenta === 'activo') {
              // Manejar inicio de sesión exitoso
              if (user.correo === 'Megapaquetesalego12@gmail.com') {
                // Administrador
                alert('Login exitoso como administrador');
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); 
                localStorage.setItem('userType', 'Administrador');
                window.location.href = '../administradores/pagina_principal.html';
              } else {
                // Cliente
                alert('Login exitoso como cliente');
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); 
                localStorage.setItem('userType', 'Cliente');
                localStorage.setItem('userId', user.id);
                window.location.href = '../usuarios/pagina_principal.html';
              }
            } else {
              // Redirigir a una página de cuenta suspendida
              window.location.href = '../errores/cuenta_suspendida.html'; // Cambia esto a la URL deseada
            }
          } else {
            // Redirigir si la contraseña es incorrecta
            window.location.href = '../errores/error3.html'; // Cambia esto a la URL deseada
          }
        } else {
          // Redirigir si el correo no existe
          window.location.href = '../errores/error3.html'; // Cambia esto a la URL deseada
        }
      })
      .catch(error => {
        alert('Ocurrió un error al intentar iniciar sesión');
        console.error('Error:', error);
      })
      .finally(() => {
        document.querySelector("#boton").disabled = false;
      });

    document.querySelector("#boton").disabled = true;
  }
});


[correo, contraseña].forEach(input => {
  input.addEventListener("blur", () => {
    remover(input);
  });
});

correo.addEventListener("blur", (event) => {
  correoelectronico(event, correo);
});

contraseña.addEventListener("blur", (event) => {
  validarContraseña(event, contraseña);
});