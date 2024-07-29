document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.create-account-form');
  
    form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        // Capturar los datos del formulario
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const contraseña = document.getElementById('contraseña').value;
        const confirmarContraseña = document.getElementById('confirmar__contraseña').value;
        const descripcion = document.getElementById('descripcion').value;
  
        // Validar que las contraseñas coincidan
        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no coinciden');
            return;
        }
  
        // Crear un objeto de usuario
        const user = {
            nombres,
            apellidos,
            correo,
            telefono,
            direccion,
            contraseña,
            descripcion
        };
  
        // Obtener y validar la lista de usuarios del local storage
        let users = JSON.parse(localStorage.getItem('users'));
  
        // Si no existe o no es un arreglo, inicializarlo como un arreglo vacío
        if (!Array.isArray(users)) {
            users = [];
        }
  
        // Añadir el nuevo usuario al arreglo
        users.push(user);
  
        // Guardar el arreglo actualizado en el local storage
        localStorage.setItem('users', JSON.stringify(users));
  
        // Limpiar el formulario
        form.reset();
  
        alert('Usuario creado exitosamente');
    });
});

  