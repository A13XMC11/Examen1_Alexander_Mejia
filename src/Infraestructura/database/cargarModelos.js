const fs = require("node:fs");
const path = require("node:path");

const LIB = path.resolve(__dirname, "../../lib");

module.exports = function cargarModelos() {
    for (const modulo of fs.readdirSync(LIB)) {
        const carpeta = path.join(LIB, modulo, "Infraestructura");
        if (!fs.existsSync(carpeta)) continue;
        for (const archivo of fs.readdirSync(carpeta)) {
        if (archivo.endsWith("Model.js")) require(path.join(carpeta, archivo));
        }
    }
};