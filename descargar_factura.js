export function generarPDF(factura) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: 'letter' // Configurar el tamaño del documento a carta
    });

    const logo = "../../imagenes/logo.png"; // Ruta de la imagen del logo
    const fondo = "../../imagenes/fondo.jpg"; // Ruta de la imagen de fondo

    doc.addImage(fondo, 'JPG', 0, 0, 260, 280); // Imagen de fondo
    doc.addImage(logo, 'PNG', 98, 6, 20, 20); // Imagen del logo

    doc.setFontSize(26);
    doc.setTextColor("#ff9933"); // Color del texto para el título
    doc.text("FACTURA", 20, 40); // Añadir el texto del título

    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Megapaquetes", 20, 60); // Nombre del negocio
    doc.text("Carrera 9 #30-14 — La cumbre", 20, 70); // Dirección del negocio
    doc.text("3187800946 - Megapaquetesalego12@gmail.com", 20, 80); // Contacto del negocio

    doc.text("DATE: " + factura.fecha, 150, 60); // Fecha de la factura
    doc.text(`Factura# ${factura.numero}`, 150, 70); // Número de la factura

    // Crear la tabla de productos
    let y = 100; // Posición vertical inicial para la tabla
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("Descripcion", 20, y); // Columna de descripción
    doc.text("Precio", 100, y); // Columna de precio
    doc.text("Cantidad", 130, y); // Columna de cantidad
    doc.text("Total", 160, y); // Columna de total

    doc.setDrawColor(0, 0, 0);
    doc.line(20, y + 5, 180, y + 5);

    factura.productos.forEach((producto) => {
        y += 20; // Mover hacia abajo para la siguiente fila
        doc.text(producto.nombre, 20, y); // Descripción del producto
        doc.text(`$${producto.precio.toFixed(0)}`, 100, y); // Precio del producto
        doc.text(`${producto.cantidad}`, 130, y); // Cantidad del producto
        doc.text(`$${(producto.precio * producto.cantidad).toFixed(0)}`, 160, y); // Total del producto
    });

    y += 20; // Mover hacia abajo para los subtotales
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("Subtotal: ", 130, y); // Subtotal
    doc.text(`$${factura.subtotal.toFixed(0)}`, 160, y); // Valor del subtotal

    y += 10; // Mover hacia abajo para el IVA
    doc.text("IVA: ", 130, y); // IVA
    doc.text(`$${factura.iva.toFixed(0)}`, 160, y); // Valor del IVA

    y += 10; // Mover hacia abajo para el costo de envío
    doc.text("Envio: ", 130, y); // Costo de envío
    doc.text(`$${factura.envio.toFixed(0)}`, 160, y); // Valor del envío

    y += 10; // Mover hacia abajo para el total final
    doc.setFontSize(14);
    doc.setTextColor("#ff9933");
    doc.text("Total: ", 130, y); // Total final
    doc.text(`$${(factura.total).toFixed(0)}`, 160, y); // Valor del total final

    doc.save("factura.pdf");
}