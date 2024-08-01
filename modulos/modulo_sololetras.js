// Validar para que el campo solo tenga letras
const sololetras = (event, elemento) => {
    // console.log(elemento.value);
    let Letras = /^[a-zA-ZÀ-ÿ\s]+$/; // Letras y espacios, pueden llevar acentos
    if (Letras.test(event.key)) {
    } else {
        event.preventDefault();
    }
};

export default sololetras;