const loginForm = document.querySelector('.from__principal');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.correo === correo && user.contraseña === contraseña);

    if (!user) {
        alert('Credenciales incorrectas');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    if (correo === 'admin@gmail.com' && contraseña === '123') {
        window.location.href = '../admin/productos/listar.html'; // Página para admin
    } else {
        window.location.href = '../productos/frutas_productos.html'; // Página para clientes
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.from__principal');
    const email = document.getElementById('correo');
    const password = document.getElementById('contraseña');

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Resetear mensajes de error y estilos
        email.classList.remove('error');
        password.classList.remove('error');
        document.querySelectorAll('.error-message').forEach(function(element) {
            element.style.display = 'none';
            email.style.border='green solid 2px'
        });

        // Validar correo electrónico
        if (!validateEmail(email.value)) {
            email.classList.add('error');
            document.getElementById('email-error').style.display = 'block';
        }

        // Validar contraseña (mínimo 8 caracteres)
        if (password.value.length < 8) {
            password.classList.add('error');
            document.getElementById('password-error').style.display = 'block';
        }

    });

    function validateEmail(email) {
        //funcion regular valida 
        const re = /^[a-z0-9._%+-]+@[a-z]+\.[a-z]+$/;
        return re.test(String(email).toLowerCase());
    }
});