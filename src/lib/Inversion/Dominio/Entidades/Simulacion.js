const EntradaInvalida = require("../../../Compartido/Dominio/Errores/EntradaInvalida");
const { categorizar } = require("../Servicios/Categorizador");

const esNumeroPositivo = (valor) => typeof valor === "number" && Number.isFinite(valor) && valor > 0;

class Simulacion {
    constructor({ id, cliente, capital, tasaPorcentaje, periodosAnuales, anios, creadaEn }) {
        if (!cliente) throw new EntradaInvalida("El cliente es obligatorio");
        if (typeof capital !== "number" || !Number.isFinite(capital) || capital <= 100) {
        throw new EntradaInvalida("El capital debe ser superior a 100 USD");
        }
        if (!esNumeroPositivo(tasaPorcentaje)) throw new EntradaInvalida("La tasa debe ser un porcentaje positivo");
        if (!Number.isInteger(periodosAnuales) || periodosAnuales < 1) {
        throw new EntradaInvalida("n debe ser un entero de al menos 1");
        }
        if (!esNumeroPositivo(anios)) throw new EntradaInvalida("El tiempo t debe ser positivo");

        this.id = id;
        this.cliente = cliente;
        this.capital = capital;
        this.tasaPorcentaje = tasaPorcentaje;
        this.periodosAnuales = periodosAnuales;
        this.anios = anios;
        this.creadaEn = creadaEn;
        this.categoria = categorizar(capital, periodosAnuales);
    }


    get tasa() {
        return this.tasaPorcentaje / 100;
    }


    valorFuturo() {
        return this.capital * Math.pow(1 + this.tasa / this.periodosAnuales, this.periodosAnuales * this.anios);
    }

    interesGanado() {
        return this.valorFuturo() - this.capital;
    }
}

module.exports = Simulacion;