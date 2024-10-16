// Declaración de la constante URL que almacena la dirección del servidor local
const URL = 'http://localhost:3000';

// const: Esta palabra clave se utiliza para declarar una variable que no se puede reasignar. 
// En otras palabras, una vez que se le asigna un valor, este no puede cambiar a lo largo de la ejecución 
// del programa.

//  URL: Es el nombre de la constante que estamos definiendo. Se utiliza para almacenar la dirección del
// servidor.

//  'http://localhost:3000': Este es el valor que se asigna a la constante URL.
 
//  http://: Indica que se está utilizando el protocolo HTTP.
//  localhost: Hace referencia a la máquina local.
//  :3000: Especifica el puerto en el que el servidor está escuchando. 
//  El puerto 3000 es comúnmente utilizado para aplicaciones de desarrollo, como servidores Node.js.

// Exportación de la constante URL como el valor por defecto del módulo
export default URL;

// export: Esta palabra clave se utiliza para exportar funciones, objetos o valores 
// desde un módulo de JavaScript, lo que permite que otras partes de la aplicación puedan acceder a ellos.

// default: Indica que estamos exportando el valor por defecto del módulo. 
// Solo puede haber un export default por módulo, lo que permite importar este valor de una manera más sencilla.

// URL: Aquí estamos exportando la constante URL, lo que significa que cualquier otro archivo 
// que importe este módulo podrá acceder a la dirección del servidor que hemos definido.
