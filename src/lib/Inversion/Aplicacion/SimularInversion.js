const Cliente = require("../Dominio/Entidades/Cliente");
const Simulacion = require("../Dominio/Entidades/Simulacion");

const redondear = (valor) => Math.round(valor * 100) / 100;

class SimularInversion {

    constructor(simulacionRepository) {
        this.simulacionRepository = simulacionRepository;
    }

    async ejecutar({ nombres, cedula, email, celular, capital, tasaPorcentaje, periodosAnuales, anios } = {}) {
        
        const cliente = new Cliente({ nombres, cedula, email, celular });
        const simulacion = new Simulacion({ cliente, capital, tasaPorcentaje, periodosAnuales, anios });
        const id = await this.simulacionRepository.guardar(simulacion);

        return {

            id,
            montoFinal: redondear(simulacion.valorFuturo()),
            interesGanado: redondear(simulacion.interesGanado()),
            categoria: simulacion.categoria
        };
    }
}

module.exports = SimularInversion;