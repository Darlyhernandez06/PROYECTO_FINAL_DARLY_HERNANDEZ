// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Función para cargar los productos desde la API y mostrarlos en la página
async function productos() {
    try {
        // Obtener los productos de la API
        const productos = await solicitud("productos");

        // Obtener el elemento del DOM donde se mostrarán los productos
        const productList = document.querySelector("#productList");

        // Obtener el template y su contenido
        const productTemplate = document.querySelector("#productTemplate");
        const templateContent = productTemplate.content;

        // Iterar sobre cada producto en la lista
        productos.forEach((product) => {
            // Asignar valores predeterminados para las propiedades del producto si no están definidos
            const productImage = product.imagen || "...";
            const productName = product.nombre || "...";
            const productPrice = product.precio || "...";
            const productQuantity = product.cantidad || "...";
            const productDescription = product.descripción || "...";
            const category = product.categoria || "...";

            // Filtrar los productos según la categoría (en este caso, solo se muestran los productos de la categoría "Tuberculos/Hortalizas")
            if (category === "Tuberculos/Hortalizas" && product.estado === 'activo') { // Verifica si el producto está activo) {
                // Clonar el contenido del template
                const productElement = document.importNode(templateContent, true);

                // Asignar los valores del producto al template clonado
                productElement.querySelector(".contenedor__imagen img").src = productImage;
                productElement.querySelector(".texto__producto").textContent = category;
                productElement.querySelector(".titulo__producto strong").textContent = productName;
                productElement.querySelector(".precio__producto--price").textContent = `$${productPrice}`;
                productElement.querySelector(".precio__producto--stock").textContent = `Stock: ${productQuantity}`;
                productElement.querySelector(".producto__descripcion p").innerHTML = `<strong>${productName}:</strong> ${productDescription}`;


                // Añadir el nuevo contenedor del producto al elemento productList en el DOM
                productList.appendChild(productElement);
            }
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función productos cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", productos);

// Evento para el filtro de búsqueda
document.addEventListener("keyup", (e) => {
  // Comprobar si el evento proviene del campo de búsqueda
  if (e.target.matches(".search")) {
      // Si se presiona "Escape", limpiar el campo de búsqueda
      if (e.key === "Escape") e.target.value = "";
      // Filtrar productos según el texto de búsqueda
      document.querySelectorAll(".producto").forEach((producto) => {
          producto.textContent
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
              ? producto.classList.remove("filtro")
              : producto.classList.add("filtro");
      });
  }
});

// Obtener el nombre completo del usuario almacenado en localStorage
const userName = localStorage.getItem('userName');

// Obtener el tipo de usuario almacenado en localStorage (por ejemplo, Administrador o Cliente)
const userType = localStorage.getItem('userType');

// Verificar si hay un nombre de usuario almacenado en localStorage
if (userName) {
    // Si hay un nombre de usuario almacenado, actualizar el contenido del elemento HTML con ese nombre
    // Mostrar el nombre completo en negrita y el tipo de usuario en una línea separada
    document.querySelector('#loggedInUserName').innerHTML = `
        <strong>${userName}</strong><br>
        <small>${userType}</small>
    `;
}

// Obtener los elementos para la gestión del menú de perfil
const salir = document.querySelector('.img-salir'); // Botón para salir
const menu = document.querySelector('.menu_perfil'); // Menú de perfil
const desplegable = document.querySelector('.desplegable'); // Botón para desplegar el menú

// Mostrar el menú de perfil cuando se hace clic en el botón desplegable
desplegable.addEventListener('click', () => {
    menu.classList.add('estilos'); // Agregar una clase que muestra el menú
});

// Ocultar el menú de perfil cuando se hace clic en el botón salir
salir.addEventListener('click', () => {
    menu.style.display = 'none'; // Ocultar el menú cambiando su estilo
});

// - target: Propiedad del objeto de evento que refiere al elemento del DOM donde ocurrió el evento. Se usa para identificar el elemento específico que activó el evento.

// - matches: Método de los elementos del DOM que verifica si el elemento cumple con un selector CSS especificado. Permite comprobar si un elemento coincide con un criterio CSS.

// - toLowerCase(): Método de cadena que convierte todos los caracteres de una cadena a minúsculas. Se usa para normalizar el texto para comparaciones insensibles a mayúsculas/minúsculas.

// - appendChild(): Método que añade un nuevo nodo al final de la lista de hijos de un nodo padre en el DOM. Se utiliza para agregar dinámicamente elementos al documento.

// - getAttribute: Obtiene el valor de un atributo especificado de un elemento.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - innerHTML: Devuelve o establece el contenido HTML de un elemento.

// - includes: Determina si una cadena contiene otra cadena, devolviendo `true` o `false`.

// - toLowerCase: Convierte una cadena a minúsculas.