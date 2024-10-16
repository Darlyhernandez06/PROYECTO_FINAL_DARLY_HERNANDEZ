// Importa la constante URL desde el módulo de configuración
import URL from "../../modulos/config.js";

// La función 'solicitud' realiza una solicitud HTTP a una URL específica utilizando la API Fetch.
// Esta es una función asíncrona (async), lo que significa que puede contener expresiones 'await'
// que permiten esperar a que se resuelvan las promesas antes de continuar la ejecución del código.
 
// Parámetros:
// - 'url': Es una cadena que representa el endpoint específico que se concatenará a la URL base.

const solicitud = async (url) => {
    
    // 'url' es el valor proporcionado que se usará para construir la URL completa.
    // La función utiliza 'fetch' para realizar una solicitud HTTP de forma asíncrona.


    // Realiza una solicitud GET a la URL combinando la URL base y el parámetro 'url'.
    // 'await' espera a que se complete la promesa devuelta por 'fetch'.
    let solicitar = await fetch(`${URL}/${url}`);
    
    // Convierte la respuesta de la solicitud a formato JSON.
    // 'await' aquí también espera a que se complete la promesa devuelta por '.json()'.
    let respuesta = await solicitar.json();
    
    // Retorna la respuesta en formato JSON.
    return respuesta;
}

// La función 'enviar' permite realizar solicitudes HTTP con opciones personalizadas.
// Esta también es una función asíncrona y recibe dos parámetros:
 
// *Función `enviar`*

// Esta función se utiliza para enviar solicitudes HTTP a un servidor. Es una función asíncrona, 
// lo que significa que puede ejecutarse simultáneamente con otras funciones.

// *Parámetros*

// - `endpoint`: La ruta específica del servidor a la que se enviará la solicitud. Por ejemplo, 
// `/usuarios`, `/productos`, etc.
// - `options`: Un objeto que contiene opciones adicionales para la solicitud, como el método 
// HTTP (GET, POST, PUT, DELETE), encabezados, cuerpo de la solicitud, etc.

// *Estructura de la función*

// 1. `try`: Bloque que intenta ejecutar el código. Si ocurre un error, se ejecuta el bloque `catch`.
// 2. `fetch`: Función que realiza una solicitud HTTP a la URL especificada por `endpoint`, usando 
// las opciones proporcionadas en `options`.
//     - `${URL}/${endpoint}`: La URL completa de la solicitud, donde `URL` es la base de la URL del servidor.
//     - `options`: Opciones de la solicitud, como método HTTP, encabezados, cuerpo, etc.
// 3. `await solicitud.json()`: Convierte la respuesta de la solicitud a formato JSON.
// 4. `return data`: Retorna la respuesta en formato JSON.

// *Bloque catch*

// Si ocurre un error durante la solicitud, este bloque captura el error y lo retorna.

// Parámetros:
// - 'endpoint': Es una cadena que especifica la ruta del recurso al que se quiere acceder.
// Por ejemplo, si la URL base es 'http://localhost:3000' y el endpoint es 'api/users',
// la solicitud se enviará a 'http://localhost:3000/api/users'.
// - 'options': Es un objeto que contiene las configuraciones de la solicitud 
// (método, encabezados, cuerpo, etc.).
 
export const enviar = async (endpoint, options) => {
    try {
        // Realiza una solicitud HTTP a la URL especificada por el endpoint, usando las opciones proporcionadas.
        // 'await' espera a que se complete la promesa devuelta por 'fetch'.
        let solicitud = await fetch(`${URL}/${endpoint}`, options);
        
        // Convierte la respuesta de la solicitud a formato JSON.
        // 'await' espera a que se complete la promesa devuelta por 'fetch'.
        let data = await solicitud.json();
        
        // Retorna la respuesta en formato JSON.
        return data;
    } catch (error) {
        // Si ocurre un error durante la solicitud, lo captura y lo retorna.
        return error;
    }
}

// Exporta la función 'solicitud' como el valor por defecto del módulo.
export default solicitud;

// 'export default solicitud;' permite que la función 'solicitud' sea importada como el valor por defecto
// en otros módulos, facilitando su reutilización para realizar solicitudes a diferentes endpoints.

// 'export const enviar' exporta la función 'enviar' como una exportación nombrada, 
// lo que permite importarla con un nombre específico en otros módulos.
