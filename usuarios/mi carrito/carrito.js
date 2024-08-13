// IMPORTACIONES
import solicitud from "../../modulos/solicitud.js"; 

// Crear un objeto vacío para almacenar los productos en el carrito 
const carrito = [];

// Agrega un producto al carrito
function agregarAlCarrito(producto) {
  // Busca el índice del producto en el carrito basado en su ID
  const index = carrito.findIndex(item => item.id === producto.id);
  
  // Si el índice es -1, significa que el producto no está en el carrito
  if (index === -1) {
    // Agrega el producto al carrito con una cantidad inicial de 1
    carrito.push({ ...producto, cantidad: 1 });
  } else {
    // Si el producto ya está en el carrito, incrementa su cantidad en 1
    carrito[index].cantidad++;
  }
  
  // Actualiza el número del carrito en el header
  actualizarNumeroCarrito();
  
  // Actualiza la vista del carrito
  actualizarCarrito();
}  

// Eliminar un producto del carrito 
function eliminarProducto(id) {
  // Busca el índice del producto en el carrito basado en su ID
  const index = carrito.findIndex(item => item.id === id);

  // Si el índice no es -1, significa que el producto está en el carrito
  if (index !== -1) {
    // Elimina el producto del carrito
    carrito.splice(index, 1);
  }
  
  // Actualiza el número del carrito en el header
  actualizarNumeroCarrito();
  
  // Actualiza la vista del carrito
  actualizarCarrito();
}

// Actualizar el número del carrito del header
function actualizarNumeroCarrito() {
  // Obtiene el número total de productos en el carrito
  const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  
  // Actualiza el número del carrito en el header
  document.getElementById('numero-carrito').innerText = totalProductos;
}

// Vaciar el carrito
function vaciarCarrito() {
  // Vacía el carrito
  carrito.length = 0;
  
  // Actualiza el número del carrito en el header
  actualizarNumeroCarrito();
  
  // Actualiza la vista del carrito
  actualizarCarrito();
}

// Actualizar la vista del carrito
function actualizarCarrito() {

}