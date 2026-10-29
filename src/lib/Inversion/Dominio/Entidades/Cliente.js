const validator = require("validator");
const EntradaInvalida = require("../../../Compartido/Dominio/Errores/EntradaInvalida");

class Cliente {
  constructor({ id, nombres, cedula, email, celular }) {
    if (typeof nombres !== "string" || nombres.trim() === "") {
        throw new EntradaInvalida("Los nombres son obligatorios");
    }
    if (!/^\d{10}$/.test(cedula || "")) {
        throw new EntradaInvalida("La cédula debe tener 10 dígitos");
    }
    if (typeof email !== "string" || !validator.isEmail(email.trim())) {
        throw new EntradaInvalida("El correo no es válido");
    }
    if (!/^\d{10}$/.test(celular || "")) {

        throw new EntradaInvalida("El celular debe tener 10 dígitos");
    }

    this.id = id;
    this.nombres = nombres.trim();
    this.cedula = cedula;
    this.email = email.trim().toLowerCase();
    this.celular = celular;
  }
}

module.exports = Cliente;