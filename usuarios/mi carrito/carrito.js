// IMPORTANCIONES
import solicitud from "../../modulos/solicitud.js"; 

// Crear un objeto vacio para almacenar los productos en el carrito 
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
}  

// Eliminar un producto del carrito 
function eliminarProducto(){

}

// Actualizar el número del carrito del header 
function actualizarNumeroCarrito(){

}

// Vacíar el carrito
function vaciarCarrito() {

}

// Actualizar la vista del carrito
function actualizarCarrito() {
    
}