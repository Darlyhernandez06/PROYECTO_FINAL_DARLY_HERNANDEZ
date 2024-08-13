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
        const user = users.find(user => user.correo === data.correo && user.contraseña === data.contraseña && user.estado_cuenta === 'activo');
        if (user) {
          if (user) {
            if (user.correo === 'Megapaquetesalego12@gmail.com') {
                alert('Login exitoso como administrador');
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); 
                localStorage.setItem('userType', 'Administrador');
                window.location.href = '../administradores/pagina_principal.html';
            } else {
                alert('Login exitoso');
                localStorage.setItem('userName', user.nombres + ' ' + user.apellidos); 
                localStorage.setItem('userType', 'Cliente');
                window.location.href = '../usuarios/pagina_principal.html';
            }
          }        
        } else {
          alert('Correo o contraseña incorrectos');
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