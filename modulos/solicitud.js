import URL from "../../modulos/config.js";

const solicitud = async () => {
    let solicitar = await fetch(`${URL}/productos`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export const productos_destacados = async () => {
    let solicitar = await fetch(`${URL}/productos_destacados`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export const solicitud_usuarios = async () => {
    let solicitar = await fetch(`${URL}/users`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export const carrito = async () => {
    let solicitar = await fetch(`${URL}/carrito`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export const factura = async () => {
    let solicitar = await fetch(`${URL}/factura`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export default solicitud;