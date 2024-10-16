import is_valid from "../productos actualizaciones/modulos_validaciones/modulo_validacion.js";

// Importamos la función `is_valid` desde un módulo externo, que se encarga de validar 
//los campos del formulario, asegurando que los datos ingresados sean correctos 
// antes de enviar el formulario al servidor.

document.addEventListener('DOMContentLoaded', () => {
    
    // Este evento se asegura de que el DOM esté completamente cargado antes de 
    // ejecutar cualquier código. Evita errores al tratar de manipular elementos 
    // del DOM que aún no se han cargado.
    

    const form = document.querySelector('#create-product-form');

    // Selecciona el formulario de creación de productos utilizando su ID. 
    // Este formulario será el que el administrador completará con los datos del nuevo producto.

    const boton = document.querySelector("#boton");
    
    // Selecciona el botón de envío del formulario por su ID. Este botón será deshabilitado 
    // temporalmente durante el proceso de envío para evitar que el administrador haga clic 
    // varias veces y envíe datos duplicados.

    const tbody = document.querySelector('tbody');
 
    // elecciona el elemento `tbody` de una tabla en la página. Este `tbody` es donde 
    // se agregarán las nuevas filas de productos que se creen con éxito. Si no existe, 
    // se lanzará un error en la consola.
    

    form.addEventListener('submit', async (event) => {
        
        // Se agrega un listener al formulario para manejar el evento `submit` (cuando 
        // el administrador intenta enviar el formulario). Se usa `async` para manejar operaciones 
        // asíncronas como las solicitudes HTTP.
        
        event.preventDefault();
        
        // Prevenimos el comportamiento predeterminado del formulario, que normalmente 
        // sería enviar los datos y recargar la página. En su lugar, controlamos el 
        // cproceso de validación y envío manualmente.
         

        // Validar los campos del formulario
        const valid = is_valid(event, "form [required]");
        
        // Utilizamos la función de validación `is_valid` para comprobar que todos 
        // los campos obligatorios del formulario están correctamente completados. 
        // Si la validación falla, `valid` será `false`.
         

        if (!valid) {
            
            // Si la validación no es exitosa (es decir, algún campo tiene un error), 
            // mostramos una alerta al administrador indicando que hay errores por corregir 
            // y lo redirigimos a una página de error.
            event.preventDefault();
            alert("Por favor, corrige los campos con errores.");
            window.location.href = "../../errores/error2.html";
            return false;  // Detenemos el envío del formulario
        }

        // Obtener la imagen y convertirla a Base64
        const fileInput = document.querySelector('#productImage').files[0];
        
        // Aquí seleccionamos el archivo de imagen que el administrador ha subido a través 
        // del campo `#productImage` del formulario. Usamos `files[0]` porque permite 
        // seleccionar el primer archivo (en caso de que más de uno pueda ser subido).
        // [0]: El [0] se refiere al primer archivo (índice cero) en la lista de archivos. En la mayoría de los casos, cuando se permite 
        // seleccionar solo un archivo, este será el único elemento en la lista. Al acceder a files[0], estás obteniendo directamente ese archivo.
        
        const reader = new FileReader();
 
        // Creamos una nueva instancia de `FileReader` para poder leer el archivo 
        // seleccionado y convertirlo a formato Base64, que es un formato que permite 
        // enviar la imagen como parte de un JSON al servidor.

        // FileReader es una API de JavaScript que permite leer el contenido de archivos de manera asíncrona en el navegador. Se utiliza
        // principalmente para leer archivos seleccionados por el usuario a través de un elemento de tipo <input type="file"> o archivos
        // obtenidos de otras fuentes, como el almacenamiento local o servidores.

        reader.onload = async function() {

            // reader.onload es un evento de la API FileReader en JavaScript. Se activa cuando el proceso de lectura de un archivo se
            // completa con éxito, permitiendo acceder al contenido del archivo leído. Este evento es clave para manejar los datos una 
            // vez que el FileReader ha terminado de procesar el archivo, ya sea que lo haya leído como texto, binario, o en un formato como Base64.

            // Este evento se activa cuando el archivo ha sido leído exitosamente. 
            // En esta función, obtenemos el resultado de la lectura (en formato Base64) 
            // y lo almacenamos en la variable `base64Image`.

            // reader.result es una propiedad del objeto FileReader que contiene el contenido del archivo después de que se ha leído correctamente.
            // El valor de reader.result varía dependiendo del método utilizado para leer el archivo (por ejemplo, como texto, datos binarios o
            // URL en formato base64).

            const base64Image = reader.result;

            // Capturar los datos del formulario
            const formData = {
                nombre: document.querySelector('#product-name').value,
                descripción: document.querySelector('#product-description').value,
                precio: document.querySelector('#product-price').value,
                cantidad: document.querySelector('#product-quantity').value,
                imagen: base64Image,  // La imagen convertida a Base64
                categoria: document.querySelector('#productCategory').value,
                estado: 'activo'  // Estado predeterminado del producto
            };
            
            // Aquí recogemos todos los datos del formulario y los almacenamos en 
            // un objeto `formData`. Este objeto incluye el nombre, descripción, precio, 
            // cantidad, imagen (en formato Base64), categoría, y estado del producto.
            // Estos datos serán enviados al servidor.
            

            try {
                boton.disabled = true;
                
                // Deshabilitamos el botón de envío para evitar que el administrador
                // intente enviar el formulario varias veces mientras se realiza 
                // el procesamiento de la solicitud.
               

                // Enviar los datos al servidor
                const response = await fetch('http://localhost:3000/productos', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                
                // Hacemos una solicitud `POST` al servidor con los datos del formulario 
                // en formato JSON. Esta solicitud enviará los datos al endpoint `/productos` 
                // en el servidor local para crear un nuevo producto.
                

                if (response.ok) {
                    // Si la respuesta del servidor es exitosa
                    const data = await response.json();
                    
                    // Parseamos la respuesta JSON devuelta por el servidor (que contiene 
                    // los datos del nuevo producto creado) y la almacenamos en la variable `data`.
                    // await es para esperar que esa promesa se cumpla
                    

                    // Limpiar los campos del formulario
                    form.reset();
                    
                    // Una vez creado el producto con éxito, reseteamos el formulario 
                    // para eliminar los valores de los campos y permitir que el administrador
                    // ingrese un nuevo producto sin necesidad de refrescar la página.
                    

                    // Agregar el nuevo producto a la tabla
                    createRow(data);
                    
                    // Llamamos a la función `createRow` para agregar una nueva fila en la tabla 
                    // de productos, visualizando el producto recién creado.
                    

                    // Mostrar un mensaje de éxito al usuario
                    alert('Producto creado exitosamente');
                    window.location.href = '../productos actualizaciones/listar.html';
                    
                    // Redirigimos al administrador a la página de listado de productos después 
                    // de haber creado un nuevo producto exitosamente.
                    
                } else {
                    alert('Error al crear el producto. Intenta de nuevo.');
                    
                    // Si la respuesta del servidor no fue exitosa, mostramos un mensaje de error.
                    
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema con el envío del formulario. Verifica tu conexión e intenta de nuevo.');
                
                // Si ocurre algún error durante la solicitud (por ejemplo, problemas de red), 
                // se captura en este bloque y se informa al usuario.
               
            } finally {
                boton.disabled = false;
                // Una vez finalizado el proceso (con éxito o error), habilitamos nuevamente 
                // el botón de envío.
                
            }
        };

        // La propiedad onerror de un objeto como FileReader es un manejador de eventos que se invoca cuando ocurre un error durante
        // el proceso de lectura de un archivo.
        reader.onerror = function(error) {
            // Manejo de errores al leer el archivo
            console.error('Error al leer el archivo:', error);
            alert('Error al leer el archivo de imagen.');
        };

        reader.readAsDataURL(fileInput);
        // Usamos el método `readAsDataURL` del objeto `FileReader` para leer el archivo de imagen 
        // y convertirlo en una URL en formato Base64, lo que permite su envío en formato JSON.

        // El método readAsDataURL() es una función del objeto FileReader que se utiliza para leer el contenido de un archivo 
        // (generalmente una imagen, video, PDF, etc.) y convertirlo en una cadena de texto en formato Base64,
    });

    // Función para crear una fila en la tabla de productos
    const createRow = (data) => {
        if (tbody) {
            const tr = tbody.insertRow(-1);  // Insertar una nueva fila al final del `tbody`

            // Crear celdas para cada dato del producto
            const tdNombre = tr.insertCell(0);
            const tdDescripción = tr.insertCell(1);
            const tdPrecio = tr.insertCell(2);
            const tdCantidad = tr.insertCell(3);
            const tdImagen = tr.insertCell(4);
            const tdCategoria = tr.insertCell(5);

            // Asignar los valores de los datos a cada celda
            tdNombre.textContent = data.nombre;
            tdDescripción.textContent = data.descripción;
            tdPrecio.textContent = data.precio;
            tdCantidad.textContent = data.cantidad;

            // Crear un elemento <img> para mostrar la imagen del producto
            const imgElement = document.createElement('img');
            imgElement.src = data.imagen;  // Asignar la URL Base64 de la imagen
            imgElement.alt = data.nombre;  // Agregar un texto alternativo
            imgElement.width = 50;  // Ajustar el tamaño de la imagen
            tdImagen.appendChild(imgElement);  // Añadir la imagen a la celda correspondiente

            tdCategoria.textContent = data.categoria;  // Mostrar la categoría del producto
        } else {
            console.error('Elemento tbody no encontrado.');
            
            // Si el elemento `tbody` no se encuentra en el DOM, se imprime un mensaje de error 
            // en la consola. Esto ayuda a depurar el problema si la tabla no está disponible.
            
        }
    };
});





// - setItem: Almacena un valor en `localStorage` usando una clave específica.

// - stringify: Convierte un objeto JavaScript en una cadena JSON.

// - getItem: Recupera un valor almacenado en `localStorage` usando una clave específica.

// - JSON.parse: Convierte una cadena JSON en un objeto JavaScript.

// - window.location.href: es una propiedad en JavaScript que representa la URL completa de la página actual en el navegador. Se puede 
// usar para obtener o establecer la dirección URL de la ventana del navegador.