const EntradaInvalida = require("./Errores/EntradaInvalida");

const ES_HTML = /[<>]/;
const ES_URL = /(https?:\/\/|www\.|ftp:\/\/)/i;
const ES_CORREO = /\S+@\S+/;

function textoPlano(valor, campo, { min = 0, max, requerido = false } = {}) {

    if (valor === undefined || valor === null || valor === "") {
        if (requerido) throw new EntradaInvalida(`${campo} requerido`);
        return undefined;
    }
    if (typeof valor !== "string") throw new EntradaInvalida(`${campo} debe ser texto`);

    const texto = valor.trim();
    
    if (requerido && texto.length === 0) throw new EntradaInvalida(`${campo} requerido`);
    if (texto.length < min) throw new EntradaInvalida(`${campo} debe tener al menos ${min} caracteres`);
    if (max !== undefined && texto.length > max) {
        throw new EntradaInvalida(`${campo} debe tener como máximo ${max} caracteres`);
    }
    if (ES_HTML.test(texto) || ES_URL.test(texto) || ES_CORREO.test(texto)) {
        throw new EntradaInvalida(`${campo} debe ser texto plano (sin HTML, URLs ni correos)`);
    }
    return texto;
}

module.exports = { textoPlano };