// IMPORTANCIONES
import correoelectronico from "../modulos/modulo_correo.js";
import sololetras from "../modulos/modulo_sololetras.js";
import solonumeros from "../modulos/modulo_solonumeros.js";
import is_valid from "../modulos/modulo_validacion.js";
import remover from "../modulos/modulo_remover.js";
import validarContraseña from '../modulos/modulo_contraseña.js';
import validarDescripcion from "../modulos/modulo_descripcion.js";

// VARIABLES

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Captura los datos introducidos en los campos del formulario
const nombres = document.querySelector('#nombres');
const apellidos = document.querySelector('#apellidos');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const direccion = document.querySelector('#direccion');
const contraseña = document.querySelector('#contraseña');
const confirmarContraseña = document.querySelector('#confirmar__contraseña');
const descripcion = document.querySelector('#descripcion');
const confirmarError = document.getElementById("confirmar-error");

//  Se añade un listener al formulario que llama a la función validar cuando se intenta enviar el formulario.
$formulario.addEventListener("submit", (event) => {
    let response = is_valid(event, "form [required]");
    // para hacer las peticiones 
    // En lugar de pasar la ruta al recurso que deseas solicitar a la llamada del método fetch(), puedes crear un objeto de petición
    // capturar todos los atributos

    const data = {
        nombres: nombres.value,
        apellidos: apellidos.value,
        correo: correo.value,
        telefono: telefono.value,
        direccion: direccion.value,
        contraseña: contraseña.value,
        confirmarContraseña: confirmarContraseña.value,
        descripcion: descripcion.value,
        rol: "cliente",
        estado_cuenta: "activo",

    }
    if (response) {
        fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then(data => {
            nombres.value = "";
            apellidos.value = "";
            correo.value = "";
            telefono.value = "";
            direccion.value = "";
            contraseña.value = "";
            confirmarContraseña.value = "";
            descripcion.value = "";

            nombres.classList.remove("correcto");
            apellidos.classList.remove("correcto");
            correo.classList.remove("correcto");
            telefono.classList.remove("correcto");
            direccion.classList.remove("correcto");
            contraseña.classList.remove("correcto");
            confirmarContraseña.classList.remove("correcto");
            descripcion.classList.remove("correcto");

            alert("Señor usuario tus datos fueron enviados exitosamente");
        })
        .catch(error => {
            alert("Señor usuario tus datos no fueron enviados");
            console.error("error")
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilitar el boton
        });
        document.querySelector("#boton").disabled = true; // Desabilitar el boton
    }
});

// GET se utiliza para obtener un recurso especifico del servidor
// POST se utiliza para crear un nuevo recurso en el servidor
// PUT se utiliza para actualizar un recurso exitente en el servidor
// DELETE se utiliza para eliminar un resurso especifico del servidor 

// keydown -- cuando ecribo tecla por tecla 
// keypress -- cuando la presiono
// keyup -- cuando la oprimo 

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[nombres, apellidos, correo, telefono, direccion, contraseña, confirmarContraseña, descripcion].forEach(input => {
    input.addEventListener("blur", () => {
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


// Validaciones específicas

// Validación del telefono
telefono.addEventListener("keypress", (event) => {
    solonumeros(event, telefono);
});

// Validación del nombre 
nombres.addEventListener("keypress", (event) => {
    sololetras(event, nombres);
});

// Validación del apellido
apellidos.addEventListener("keypress", (event) => {
    sololetras(event, apellidos);
});

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    correoelectronico(event, correo);
});

// Validación de la contraseña
contraseña.addEventListener("blur", (event) => {
    validarContraseña(event, contraseña);
});

// Validacion de la descripcion
descripcion.addEventListener("blur", (event) => {
    validarDescripcion(event, descripcion);
});

// P@ssw0rd1
// darlyhernadez0624@gmail.com