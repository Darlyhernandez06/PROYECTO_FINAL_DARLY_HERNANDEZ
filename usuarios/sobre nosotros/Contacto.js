// IMPORTACIONES 
import correoelectronico from "../../modulos/modulo_correo.js";
import sololetras from "../../modulos/modulo_sololetras.js";
import solonumeros from "../../modulos/modulo_solonumeros.js";
import validarDescripcion from "../../modulos/modulo_descripcion.js";
import is_valid from "../../modulos/modulo_validacion.js";
import remover from "../../modulos/modulo_remover.js";

// VARIABLES

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Captura los datos introducidos en los campos del formulario
const nombres = document.querySelector('#nombres');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const descripcion = document.querySelector('#descripcion');

//  Se añade un listener al formulario que llama a la función validar cuando se intenta enviar el formulario.
$formulario.addEventListener("submit", (event) => {
    let response = is_valid(event, "form [required]");

    // Si la validación falla, evitar que se envíe el formulario
    if (!response) {
        event.preventDefault();
        alert("Por favor, corrige los campos con errores.");
        window.location.href = "../../../errores/error1.html";
        return;  // Detenemos el envío del formulario
    }

    const data = {
        nombres: nombres.value,
        correo: correo.value,
        telefono: telefono.value,
        descripcion: descripcion.value,
    }
    if (response) {
        fetch('http://localhost:3000/mensajes', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            nombres.value = "";
            correo.value = "";
            telefono.value = "";
            descripcion.value = "";

            nombres.classList.remove("correcto");
            correo.classList.remove("correcto");
            telefono.classList.remove("correcto");
            descripcion.classList.remove("correcto");

            alert("Señor usuario gracias por tu mensaje fue enviado exitosamente");
        })
        .catch(error => {
            alert("Señor usuario tu mensaje no fue enviado");
            console.error("error")
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilitar el boton
        });
        document.querySelector("#boton").disabled = true; // Desabilitar el boton
    }
});

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[nombres, correo, telefono, descripcion].forEach(input => {
    input.addEventListener("blur", () => {
        remover(input);
    });
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

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    correoelectronico(event, correo);
});

// Validacion de la descripcion
descripcion.addEventListener("blur", (event) => {
    validarDescripcion(event, descripcion);
});

// Función para actualizar el contador del carrito en la interfaz
async function actualizarContadorCarrito() {
    try {
        // Obtener el userId desde localStorage
        const userId = localStorage.getItem('userId');

        // Obtener los productos actuales en el carrito para ese usuario
        const response = await fetch(`http://localhost:3000/carrito?userId=${userId}`);
        const carrito = await response.json();

        // Contar el número total de productos en el carrito
        const totalProductos = carrito.length; // Contar la cantidad de productos en el carrito

        // Actualizar el contador en el HTML
        document.querySelector("#cuenta_carrito").textContent = totalProductos;
    } catch (error) {
        console.error("Error al actualizar el contador del carrito:", error);
    }
}

// Llama a la función para actualizar el contador del carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);