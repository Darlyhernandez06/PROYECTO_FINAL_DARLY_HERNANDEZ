// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js";

// Función para cargar los productos desde la API y mostrarlos en la página
async function loadProducts() {
    try {
        // Obtener los productos de la API
        const products = await solicitud("productos");

        // Obtener el elemento del DOM donde se mostrarán los productos
        const productList = document.querySelector("#productList");

        // Limpiar el contenedor antes de llenarlo con nuevos datos
        productList.innerHTML = '';

        // Iterar sobre cada producto en la lista
        products.forEach((product) => {
            // Asignar valores predeterminados para las propiedades del producto si no están definidos
            const productImage = product.imagen || "...";
            const productName = product.nombre || "...";
            const productPrice = product.precio || "...";
            const productQuantity = product.cantidad || "...";
            const productDescription = product.descripción || "...";
            const category = product.categoria || "...";

            // Filtrar los productos según la categoría (en este caso, solo se muestran los productos de la categoría "Fruta")
            if (category === "Tubérculo") {
                // Crear un nuevo contenedor para el producto
                const productElement = document.createElement("div");
                productElement.classList.add("contenedor__producto");
                productElement.classList.add("producto");

                // Rellenar el contenedor con la información del producto usando una plantilla de cadena (template literal)
                productElement.innerHTML = `
                    <!-- Contenedor de la imagen del producto -->
                    <div class="contenedor__imagen">
                        <img src="${productImage}" alt="Imagen de producto">
                    </div>
                    <!-- Información del producto -->
                    <div class="informacion__producto">
                        <p class="texto__producto">${category}</p>
                        <h3 class="titulo__producto"><strong>${productName}</strong></h3>
                        <p class="precio__producto"><strong>$${productPrice}</strong></p>
                        <p class="precio__producto"><strong>Stock: ${productQuantity}</strong></p>
                        <!-- Contenedor de botones para controlar la cantidad del producto -->
                        <div class="contenedor__cantidad">
                            <span class="boton__cantidad01">-</span>
                            <input type="text" class="input__cantidad" value="${1}" readonly max="${productQuantity}">
                            <span class="boton__cantidad">+</span>
                        </div>
                        <!-- Botón para añadir el producto al carrito -->
                        <div class="boton-añadir">
                            <a class="boton__añadir--link" style="text-decoration: none;">Añadir al carrito</a>
                        </div>
                        <!-- Contenedor para la descripción del producto -->
                        <div class="producto__descripcion--contenedor">
                            <div class="producto__descripcion">
                                <p><strong>${productName}:</strong> ${productDescription}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Añadir el nuevo contenedor del producto al elemento productList en el DOM
                productList.appendChild(productElement);
            }
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función loadProducts cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadProducts);


// Función para cambiar la cantidad de productos
function changeQuantity(element, change) {
  // Obtener el campo de entrada y sus valores actuales y máximos
  let input = element.parentElement.querySelector(".input__cantidad");
  let currentValue = parseInt(input.value);
  let maxValue = parseInt(input.getAttribute("max"));
  let newValue = currentValue + change;

  // Asegurarse de que la nueva cantidad sea válida
  if (newValue > 0 && (isNaN(maxValue) || newValue <= maxValue)) {
      input.value = newValue;
  }
}

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