import URL from "../../modulos/config.js";

const solicitud = async () => {
    let solicitar = await fetch(`${URL}/productos`);
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

export default solicitud;