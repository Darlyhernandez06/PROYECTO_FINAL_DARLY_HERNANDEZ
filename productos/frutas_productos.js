// Función para cargar los productos desde localStorage y mostrarlos en la página
function loadProducts() {
  // Obtener la lista de productos del localStorage o inicializarla como un array vacío si no hay productos
  const products = JSON.parse(localStorage.getItem("products")) || [];
  // Obtener el elemento del DOM donde se mostrarán los productos
  const productList = document.querySelector("#productList");

  // Iterar sobre cada producto en la lista
  products.forEach((product) => {
      // Asignar valores predeterminados para las propiedades del producto si no están definidos
      const productImage = product.productImage || "...";
      const productName = product.name || "...";
      const productPrice = product.price || "...";
      const productQuantity = product.quantity || "...";
      const productDescription = product.description || "...";
      const categoría = product.productCategory || "...";

      // Filtrar los productos según la categoría (en este caso, solo se muestran los productos de la categoría "Fruta")
      if (categoría === "Fruta") {
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
                  <p class="texto__producto">${categoría}</p>
                  <h3 class="titulo__producto"><strong>${productName}</strong></h3>
                  <p class="precio__producto"><strong>$${productPrice}</strong></p>
                  <p class="precio__producto"><strong>Stock: ${productQuantity}</strong></p>
                  <!-- Contenedor de botones para controlar la cantidad del producto -->
                  <div class="contenedor__cantidad">
                      <span class="boton__cantidad01" onclick="changeQuantity(this, -1)">-</span>
                      <input type="text" class="input__cantidad" value="${1}" readonly max="${productQuantity}">
                      <span class="boton__cantidad" onclick="changeQuantity(this, 1)">+</span>
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
}

// Llamar a la función loadProducts cuando el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadProducts);

// Función para cambiar la cantidad del producto
function changeQuantity(element, change) {
  // Obtener el campo de entrada que muestra la cantidad del producto
  let input = element.parentElement.querySelector(".input__cantidad");
  let currentValue = parseInt(input.value); // Valor actual de la cantidad
  let maxValue = parseInt(input.getAttribute("max")); // Valor máximo permitido para la cantidad
  let newValue = currentValue + change; // Nuevo valor calculado para la cantidad

  // Actualizar el valor si es válido (es decir, mayor que 0 y no supera el valor máximo permitido)
  if (newValue > 0 && (isNaN(maxValue) || newValue <= maxValue)) {
    input.value = newValue;
  }
}

// Mostrar el nombre del usuario logueado en la página si está disponible en localStorage
const loggedInUserName = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUserName) {
  // Establecer el nombre del usuario logueado en el elemento con id "loggedInUserName"
  document.getElementById("loggedInUserName").textContent =
    loggedInUserName.nombres + " " + loggedInUserName.apellidos;
}

// Manejar la visibilidad del menú de perfil al hacer clic en los botones correspondientes
const salir = document.querySelector(".img-salir");
const menu = document.querySelector(".menu_perfil");
const desplegable = document.querySelector(".desplegable");

// Mostrar el menú de perfil cuando se hace clic en el botón desplegable
desplegable.addEventListener("click", () => {
  menu.classList.add("estilos");
});

// Ocultar el menú de perfil cuando se hace clic en el botón de salir
salir.addEventListener("click", () => {
  menu.style.display = "none";
});

// Filtrar los productos en función del texto ingresado en el campo de búsqueda
document.addEventListener("keyup", (e) => {
  // Verificar si el campo de búsqueda está siendo utilizado
  if (e.target.matches(".search")) {
      // Limpiar el campo de búsqueda si se presiona la tecla Escape
      if (e.key === "Escape") e.target.value = "";

      // Iterar sobre todos los elementos con la clase "producto"
      document.querySelectorAll(".producto").forEach((producto) => {
          // Comparar el texto del producto con el valor de búsqueda (ignorando mayúsculas/minúsculas)
          producto.textContent
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
            ? producto.classList.remove("filtro") // Mostrar producto si coincide con la búsqueda
            : producto.classList.add("filtro"); // Ocultar producto si no coincide con la búsqueda operacion ternaria
      });
  }
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