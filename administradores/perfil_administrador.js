//traer el usuario logueado
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

//llenar formulario con los datos del usuario logueado
if (loggedInUser) {
  document.getElementById("nombres").value = loggedInUser.nombres;
  document.getElementById("apellidos").value = loggedInUser.apellidos;
  document.getElementById("correo").value = loggedInUser.correo;
  document.getElementById("telefono").value = loggedInUser.telefono;
  document.getElementById("direccion").value = loggedInUser.direccion;
  document.getElementById("descripcion").value = loggedInUser.descripcion;
  document.getElementById("loggedInUserName").innerText =
    loggedInUser.nombres + " " + loggedInUser.apellidos;
}

//evento click en el boton actualizar
document.querySelector("#actualizar").addEventListener("click", (event) => {
    event.preventDefault();
    //actualiza los datos del usuario logueado
    const updatedUser = {
      nombres: document.getElementById("nombres").value,
      apellidos: document.getElementById("apellidos").value,
      correo: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      descripcion: document.getElementById("descripcion").value,
    };

    // guarda los datos
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Obtener lista de usuarios
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //buscar el usuario loguado en la lista de usuarios
    const index = users.findIndex(
      (user) => user.correo === updatedUser.correo
    );

    //si encuentra el usuario lo actualiza
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Perfil actualizado con éxito");
    location.reload();
});

const salir = document.querySelector('.img-salir');
const menu = document.querySelector('.menu_perfil');
const desplegable = document.querySelector('.desplegable');

desplegable.addEventListener('click', () => {
    menu.classList.add('estilos');
});

salir.addEventListener('click', () => {
    menu.style.display = 'none';
});