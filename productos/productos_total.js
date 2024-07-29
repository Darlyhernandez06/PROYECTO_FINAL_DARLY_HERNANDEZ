function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("productList");

    products.forEach((product) => {
      // Validar y asignar valores predeterminados si es necesario
      const productImage = product.productImage || "...";
      const productName = product.name || "...";
      const productPrice = product.price || "...";
      const productQuantity = product.quantity || "...";
      const productDescription = product.description || "...";
      const categoría = product.productCategory || "...";

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
    });
  }

  document.addEventListener("DOMContentLoaded", loadProducts);

  function changeQuantity(element, change) {
    let input = element.parentElement.querySelector(".input__cantidad");
    let currentValue = parseInt(input.value);
    let maxValue = parseInt(input.getAttribute("max"));
    let newValue = currentValue + change;

    if (newValue > 0 && (isNaN(maxValue) || newValue <= maxValue)) {
      input.value = newValue;
    }
  }

  const loggedInUserName = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUserName) {
    document.getElementById("loggedInUserName").textContent =
      loggedInUserName.nombres + " " + loggedInUserName.apellidos;
  }

  const salir = document.querySelector(".img-salir");
  const menu = document.querySelector(".menu_perfil");
  const desplegable = document.querySelector(".desplegable");

  desplegable.addEventListener("click", () => {
    menu.classList.add("estilos");
  });

  salir.addEventListener("click", () => {
    menu.style.display = "none";
  });

  //filtro
  document.addEventListener("keyup", (e) => {
    if (e.target.matches(".search")) {
      if (e.key === "Escape") e.target.value = "";
      document.querySelectorAll(".producto").forEach((producto) => {
        producto.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
          ? producto.classList.remove("filtro")
          : producto.classList.add("filtro");
      });
    }
  });