// Espera a que el contenido del documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el formulario de creación de cuenta utilizando la clase 'create-account-form'
    const form = document.querySelector('.create-account-form');
  
    // Añade un event listener para el evento 'submit' en el formulario
    form.addEventListener('submit', (event) => {
        // Previene el comportamiento predeterminado del formulario (que es enviar una solicitud de formulario)
        event.preventDefault();
  
        // Captura los datos introducidos en los campos del formulario
        const nombres = document.querySelector('#nombres').value;
        const apellidos = document.querySelector('#apellidos').value;
        const correo = document.querySelector('#correo').value;
        const telefono = document.querySelector('#telefono').value;
        const direccion = document.querySelector('#direccion').value;
        const contraseña = document.querySelector('#contraseña').value;
        const confirmarContraseña = document.querySelector('#confirmar__contraseña').value;
        const descripcion = document.querySelector('#descripcion').value;
  
        // Verifica que las contraseñas ingresadas coincidan
        if (contraseña !== confirmarContraseña) {
            // Muestra una alerta si las contraseñas no coinciden
            alert('Las contraseñas no coinciden');
            // Termina la ejecución del código si las contraseñas no coinciden
            return;
        }
  
        // Crea un objeto de usuario con los datos del formulario
        const user = {
            nombres,
            apellidos,
            correo,
            telefono,
            direccion,
            contraseña,
            descripcion
        };
  
        // Obtiene la lista de usuarios del almacenamiento local (localStorage)
        let users = JSON.parse(localStorage.getItem('users'));
  
        // Si la lista de usuarios no existe o no es un arreglo, inicialízala como un arreglo vacío
        if (!Array.isArray(users)) {
            users = [];
        } // Array.isArray(users): Verifica si users es un arreglo.
        // !Array.isArray(users): Si users no es un arreglo (es false), la condición es true.
        // users = [];: Inicializa users como un arreglo vacío si no es un arreglo.
  
        // Añade el nuevo usuario al arreglo de usuarios
        users.push(user);
  
        // Guarda el arreglo actualizado de usuarios en el almacenamiento local
        localStorage.setItem('users', JSON.stringify(users));
  
        // Limpia los campos del formulario para que esté listo para la próxima entrada
        form.reset();
  
        // Muestra una alerta indicando que el usuario ha sido creado exitosamente
        alert('Usuario creado exitosamente');
    });
});

// - findIndex: Encuentra el índice del primer elemento en un array que cumple con una condición dada.

// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.