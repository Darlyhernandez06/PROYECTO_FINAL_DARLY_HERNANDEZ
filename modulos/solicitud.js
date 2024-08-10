import URL from "../../modulos/config.js";

const solicitud = async () => {
    let solicitar = await fetch(`${URL}/productos`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export default solicitud;