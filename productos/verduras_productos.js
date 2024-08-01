// Función que carga los productos desde el localStorage
function loadProducts() {
  // Obtener los productos del localStorage o inicializar un array vacío si no hay productos
  const products = JSON.parse(localStorage.getItem("products")) || [];
  // Obtener el contenedor donde se mostrarán los productos
  const productList = document.querySelector("#productList");

  // Iterar sobre cada producto
  products.forEach((product) => {
      // Validar y asignar valores predeterminados si es necesario
      const productImage = product.productImage || "...";
      const productName = product.name || "...";
      const productPrice = product.price || "...";
      const productQuantity = product.quantity || "...";
      const productDescription = product.description || "...";
      const categoría = product.productCategory || "...";

      // Filtrar los productos según la categoría seleccionada
      if (categoría === "Verdura") {
          // Crear un nuevo contenedor para cada producto
          const productElement = document.createElement("div");
          productElement.classList.add("contenedor__producto");
          productElement.classList.add("producto");
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
                  <!-- Contenedor de botones para control de cantidad -->
                  <div class="contenedor__cantidad">
                      <span class="boton__cantidad01" onclick="changeQuantity(this, -1)">-</span>
                      <input type="text" class="input__cantidad" value="${1}" readonly max="${productQuantity}">
                      <span class="boton__cantidad" onclick="changeQuantity(this, 1)">+</span>
                  </div>
                  <!-- Botón para añadir producto -->
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

          // Añadir el nuevo contenedor al productList
          productList.appendChild(productElement);
      }
  });
}

// Ejecutar loadProducts cuando el DOM esté completamente cargado
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

// Obtener el nombre del usuario logueado del localStorage
const loggedInUserName = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUserName) {
  // Mostrar el nombre del usuario en el elemento correspondiente
  document.getElementById("loggedInUserName").textContent =
      loggedInUserName.nombres + " " + loggedInUserName.apellidos;
}

// Elementos para controlar el menú de perfil y el botón de salir
const salir = document.querySelector(".img-salir");
const menu = document.querySelector(".menu_perfil");
const desplegable = document.querySelector(".desplegable");

// Evento para mostrar el menú de perfil
desplegable.addEventListener("click", () => {
  menu.classList.add("estilos");
});

// Evento para ocultar el menú de perfil
salir.addEventListener("click", () => {
  menu.style.display = "none";
});

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

// - target: Propiedad del objeto de evento que refiere al elemento del DOM donde ocurrió el evento. Se usa para identificar el elemento específico que activó el evento.

// - matches: Método de los elementos del DOM que verifica si el elemento cumple con un selector CSS especificado. Permite comprobar si un elemento coincide con un criterio CSS.

// - toLowerCase(): Método de cadena que convierte todos los caracteres de una cadena a minúsculas. Se usa para normalizar el texto para comparaciones insensibles a mayúsculas/minúsculas.

// - appendChild(): Método que añade un nuevo nodo al final de la lista de hijos de un nodo padre en el DOM. Se utiliza para agregar dinámicamente elementos al documento.

// - getAttribute: Obtiene el valor de un atributo especificado de un elemento.

// - textContent: Devuelve o establece el contenido textual de un elemento.

// - innerHTML: Devuelve o establece el contenido HTML de un elemento.

// - includes: Determina si una cadena contiene otra cadena, devolviendo `true` o `false`.

// - toLowerCase: Convierte una cadena a minúsculas.