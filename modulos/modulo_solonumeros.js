// Validar para que el campo solo tenga numeros
const solonumeros = function(event) {
    if(event.keyCode < 48 || event.keyCode > 57) 
    event.preventDefault();
};

export default solonumeros;