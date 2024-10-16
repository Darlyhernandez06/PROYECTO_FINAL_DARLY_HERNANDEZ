// IMPORTACIONES
import correoelectronico from "../modulos/modulo_correo.js"; // Importa la función que valida el formato del correo electrónico.
import sololetras from "../modulos/modulo_sololetras.js"; // Importa la función que permite solo letras en un campo.
import solonumeros from "../modulos/modulo_solonumeros.js"; // Importa la función que permite solo números en un campo.
import is_valid from "../modulos/modulo_validacion.js"; // Importa la función que valida todos los campos requeridos en el formulario.
import remover from "../modulos/modulo_remover.js"; // Importa la función que añade o quita clases de validación en los campos.
import validarContraseña from '../modulos/modulo_contraseña.js'; // Importa la función que valida la complejidad de la contraseña.
import validarDescripcion from "../modulos/modulo_descripcion.js"; // Importa la función que valida la descripción.


// VARIABLES

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Captura los datos introducidos en los campos del formulario
const nombres = document.querySelector('#nombres'); // Selecciona el campo de entrada para nombres. id
const apellidos = document.querySelector('#apellidos'); // Selecciona el campo de entrada para apellidos.
const correo = document.querySelector('#correo'); // Selecciona el campo de entrada para correo electrónico.
const telefono = document.querySelector('#telefono'); // Selecciona el campo de entrada para el teléfono.
const direccion = document.querySelector('#direccion'); // Selecciona el campo de entrada para la dirección.
const contraseña = document.querySelector('#contraseña'); // Selecciona el campo de entrada para la contraseña.
const confirmarContraseña = document.querySelector('#confirmar__contraseña'); // Selecciona el campo para confirmar la contraseña.
const descripcion = document.querySelector('#descripcion'); // Selecciona el campo de entrada para la descripción.
const confirmarError = document.getElementById("confirmar-error"); // Selecciona el elemento donde se mostrará el error de confirmación de contraseña.

// Se añade un listener al formulario que escucha el evento "submit" (cuando se intenta enviar el formulario).
$formulario.addEventListener("submit", (event) => {
    // El objeto event representa el evento de envío del formulario.
    // Se utiliza preventDefault() para evitar que el formulario se envíe de forma predeterminada.
    let response = is_valid(event, "form [required]"); // Llama a la función is_valid para validar los
    // campos requeridos.

    // Captura los datos introducidos en el formulario en un objeto.
    const data = {
        nombres: nombres.value, // Almacena el valor del campo nombres.
        apellidos: apellidos.value, // Almacena el valor del campo apellidos.
        correo: correo.value, // Almacena el valor del campo correo.
        telefono: telefono.value, // Almacena el valor del campo teléfono.
        direccion: direccion.value, // Almacena el valor del campo dirección.
        contraseña: contraseña.value, // Almacena el valor del campo contraseña.
        confirmarContraseña: confirmarContraseña.value, // Almacena el valor del campo de confirmación de contraseña.
        descripcion: descripcion.value, // Almacena el valor del campo descripción.
        rol: "cliente", // Define el rol del usuario como 'cliente'.
        estado_cuenta: "activo", // Define el estado de la cuenta como 'activo'.
    }

    if (response) { // Si la validación fue exitosa
        // Primero, verificar si el correo ya está registrado
        // Realiza una solicitud GET al servidor para verificar si ya existe un usuario con el correo proporcionado.
        fetch(`http://localhost:3000/users?correo=${(correo.value)}`) // 
        // 'http://localhost:3000': Protocolo HTTP y dirección del servidor local
        // '/users': Recurso del servidor que maneja usuarios
        // '?correo=': Parámetro de consulta que permite enviar el correo como parte de la URL
        // '${(correo.value)}': Expresión que obtiene el valor del campo de entrada de correo
        // Realiza una solicitud para verificar si el correo ya existe.

            .then((response) => response.json()) // Convierte la respuesta a formato JSON.
            .then((usuarios) => {
                // Si el array de usuarios devuelto no está vacío, significa que el correo ya está en uso
                if (usuarios.length > 0) {
                    window.location.href = "../errores/correo.html"; // Redirige a la página de error si el correo ya está registrado.
                } else {
                    // Si el correo no está en uso, proceder a crear el nuevo usuario
                    return fetch('http://localhost:3000/users', { // Realiza una solicitud POST para crear un nuevo usuario.
                        method: 'POST', // Especifica el método HTTP como POST.
                        body: JSON.stringify(data), // Convierte el objeto data a formato JSON.
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8', // Establece el tipo de contenido de la solicitud.
                        },
                    });
                }
            })
        .then((response) => response.json()) // Convierte la respuesta a formato JSON.
        .then(data => {
            // Limpia los campos del formulario después de enviar los datos
            nombres.value = ""; // Limpia el campo de nombres.
            apellidos.value = ""; // Limpia el campo de apellidos.
            correo.value = ""; // Limpia el campo de correo.
            telefono.value = ""; // Limpia el campo de teléfono.
            direccion.value = ""; // Limpia el campo de dirección.
            contraseña.value = ""; // Limpia el campo de contraseña.
            confirmarContraseña.value = ""; // Limpia el campo de confirmación de contraseña.
            descripcion.value = ""; // Limpia el campo de descripción.

            // Quita las clases de validación correctas de los campos
            nombres.classList.remove("correcto"); // Quita la clase correcto del campo nombres.
            apellidos.classList.remove("correcto"); // Quita la clase correcto del campo apellidos.
            correo.classList.remove("correcto"); // Quita la clase correcto del campo correo.
            telefono.classList.remove("correcto"); // Quita la clase correcto del campo teléfono.
            direccion.classList.remove("correcto"); // Quita la clase correcto del campo dirección.
            contraseña.classList.remove("correcto"); // Quita la clase correcto del campo contraseña.
            confirmarContraseña.classList.remove("correcto"); // Quita la clase correcto del campo de confirmación de contraseña.
            descripcion.classList.remove("correcto"); // Quita la clase correcto del campo descripción.

            alert("Señor usuario tus datos fueron enviados exitosamente"); // Notifica al usuario que los datos fueron enviados con éxito.
            // Redirigir a la página de inicio de sesión
            window.location.href = "/ingresar/ingresar.html"; // Cambia la ubicación a la página de inicio de sesión.
        })
        .catch(error => {
            alert("Señor usuario tus datos no fueron enviados"); // Notifica al usuario si hubo un error en el envío.
            console.error("error"); // Muestra el error en la consola para depuración.
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilita el botón al finalizar la solicitud.
        });

        document.querySelector("#boton").disabled = true; // Deshabilita el botón mientras se procesa la solicitud.
    }
});

// Se añaden validadores específicos para los campos de entrada

// Se añade un listener para el evento "blur" en cada uno de los campos. 
// "blur" se dispara cuando el campo pierde el foco. 
// Llama a la función remover para verificar el estado del campo.
[nombres, apellidos, correo, telefono, direccion, contraseña, confirmarContraseña, descripcion].forEach(input => {
    input.addEventListener("blur", () => { // Al perder el foco en el campo
        remover(input); // Llama a la función remover para limpiar las clases de validación.
    });
});

// Validar la confirmación de contraseña
confirmarContraseña.addEventListener("blur", () => {
    if (contraseña.value === confirmarContraseña.value) { // Verifica si las contraseñas coinciden
        // Elimina la clase error si las contraseñas coinciden
        contraseña.classList.remove("error"); // Quita la clase error del campo contraseña.
        confirmarContraseña.classList.remove("error"); // Quita la clase error del campo de confirmación de contraseña.
        // Añade la clase correcto
        contraseña.classList.add("correcto"); // Añade la clase correcto al campo contraseña.
        confirmarContraseña.classList.add("correcto"); // Añade la clase correcto al campo de confirmación de contraseña.
        // Limpia el mensaje de error
        confirmarError.textContent = ''; // Elimina el mensaje de error.
    } else {
        // Agrega la clase error a los campos de contraseña
        contraseña.classList.add("error"); // Añade la clase error al campo contraseña.
        confirmarContraseña.classList.add("error"); // Añade la clase error al campo de confirmación de contraseña.
        // Elimina la clase correcto si estaba presente
        contraseña.classList.remove("correcto"); // Quita la clase correcto del campo contraseña.
        confirmarContraseña.classList.remove("correcto"); // Quita la clase correcto del campo de confirmación de contraseña.
        // Muestra el mensaje de error
        confirmarError.textContent = 'Las contraseñas no coinciden'; // Muestra un mensaje de error si las contraseñas no coinciden.
    }
});

// Validaciones específicas

// Validación del teléfono
telefono.addEventListener("keypress", (event) => {
    // El evento 'keypress' se activa cuando se presiona una tecla en el campo teléfono.
    // Llama a la función solonumeros para permitir solo la entrada de números.
    solonumeros(event, telefono); 
});

// Validación del nombre 
nombres.addEventListener("keypress", (event) => {
    // El evento 'keypress' se activa cuando se presiona una tecla en el campo nombres.
    // Llama a la función sololetras para permitir solo la entrada de letras.
    sololetras(event, nombres); 
});

// Validación del apellido
apellidos.addEventListener("keypress", (event) => {
    // El evento 'keypress' se activa cuando se presiona una tecla en el campo apellidos.
    // Llama a la función sololetras para permitir solo la entrada de letras.
    sololetras(event, apellidos); 
});

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    // El evento 'blur' se activa cuando el campo correo pierde el foco.
    // Llama a la función correoelectronico para validar el formato del correo electrónico.
    correoelectronico(event, correo); 
});

// Validación de la contraseña
contraseña.addEventListener("blur", (event) => {
    // El evento 'blur' se activa cuando el campo contraseña pierde el foco.
    // Llama a la función validarContraseña para validar la complejidad de la contraseña.
    validarContraseña(event, contraseña); 
});

// Validación de la descripción
descripcion.addEventListener("blur", (event) => {
    // El evento 'blur' se activa cuando el campo descripción pierde el foco.
    // Llama a la función validarDescripcion para validar la descripción ingresada.
    validarDescripcion(event, descripcion); 
});


// P@ssw0rd1
// darlyhernadez0624@gmail.com