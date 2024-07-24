document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
    const $formulario = document.querySelector("form");
  
    // Selecciona los elementos del formulario por su ID. Cada uno se asigna a una variable
    const nombres = document.querySelector('#nombres');
    const apellidos = document.querySelector('#apellidos');
    const correo = document.querySelector('#correo');
    const telefono = document.querySelector('#telefono');
    const direccion = document.querySelector('#direccion');
    const contraseña = document.querySelector('#contraseña');
    const confirmarContraseña = document.querySelector('#confirmar__contraseña');
    const descripcion = document.querySelector('#descripcion');
  
    // Función que elimina la clase error de un campo de entrada (input) y agrega la clase correcto
    const quitarClase = (input) => {
        input.classList.remove('error');
        input.classList.add('correcto');
    };
  
    // Función para validar el formulario
    const validar = (event) => {
        event.preventDefault();
        let valid = true;
  
        if (nombres.value === "") {
            nombres.focus();
            nombres.classList.add("error");
            valid = false;
        } else {
            quitarClase(nombres);
        }
  
        if (apellidos.value === "") {
            apellidos.focus();
            apellidos.classList.add("error");
            valid = false;
        } else {
            quitarClase(apellidos);
        }
  
        if (correo.value === "") {
            correo.focus();
            correo.classList.add("error");
            valid = false;
        } else {
            quitarClase(correo);
        }
  
        if (telefono.value === "") {
            telefono.focus();
            telefono.classList.add("error");
            valid = false;
        } else {
            quitarClase(telefono);
        }
  
        if (direccion.value === "") {
            direccion.focus();
            direccion.classList.add("error");
            valid = false;
        } else {
            quitarClase(direccion);
        }
  
        if (contraseña.value === "" || confirmarContraseña.value === "" || contraseña.value !== confirmarContraseña.value) {
            contraseña.focus();
            contraseña.classList.add("error");
            confirmarContraseña.classList.add("error");
            valid = false;
        } else {
            quitarClase(contraseña);
            quitarClase(confirmarContraseña);
        }
  
        if (descripcion.value === "") {
            descripcion.focus();
            descripcion.classList.add("error");
            valid = false;
        } else {
            quitarClase(descripcion);
        }
  
        if (valid) {
            alert("Formulario enviado correctamente");
            // Aquí puedes realizar la acción de envío real
        }
    };
  
    // Añadir el listener para el evento submit
    $formulario.addEventListener("submit", validar);
  
    // Función que agrega o quita la clase correcto dependiendo de si el campo tiene un valor. Se utiliza para cambiar el estado visual del campo en tiempo real.
    const remover = (input) => {
        if (input.value !== "") {
            input.classList.add("correcto");
            input.classList.remove("error");
        } else {
            input.classList.remove("correcto");
            input.classList.add("error");
        }
    };
  
    // Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
    [nombres, apellidos, correo, telefono, direccion, contraseña, confirmarContraseña, descripcion].forEach(input => {
        input.addEventListener("keyup", () => {
            remover(input);
        });
    });

    // Función para permitir solo números en el campo de teléfono
    const solonumeros = function(event) {
        if(event.keyCode < 48 || event.keyCode > 57) 
        event.preventDefault();
    };
  
    // Función para permitir solo letras en los campos de nombres y apellidos
    const sololetras = (event, elemento) => {
        let Letras = /^[a-zA-ZÀ-ÿ\s]+$/; // Letras y espacios, pueden llevar acentos
        if (!Letras.test(event.key)) {
            event.preventDefault();
        }
    };
  
    telefono.addEventListener("keypress", solonumeros);
    nombres.addEventListener("keypress", (event) => {
        sololetras(event, nombres);
    });
    apellidos.addEventListener("keypress", (event) => {
        sololetras(event, apellidos);
    });
});

  