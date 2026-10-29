const { obtenerSequelize } = require("../../../Infraestructura/database/Sequelize");
const ClienteModel = require("./ClienteModel");
const SimulacionModel = require("./SimulacionModel");

const redondear = (valor) => Math.round(valor * 100) / 100;

class SimulacionRepositorySequelize {

    async guardar(simulacion) {
        
        return obtenerSequelize().transaction(async (transaccion) => {
        const { nombres, cedula, email, celular } = simulacion.cliente;
        const [cliente] = await ClienteModel.findOrCreate({
        
            where: { cedula },
            defaults: { nombres, email, celular },
            transaction: transaccion
        });

        const fila = await SimulacionModel.create(
            {
                clienteId: cliente.id,
                capital: simulacion.capital,
                tasaPorcentaje: simulacion.tasaPorcentaje,
                periodosAnuales: simulacion.periodosAnuales,
                anios: simulacion.anios,
                montoFinal: redondear(simulacion.valorFuturo()),
                interesGanado: redondear(simulacion.interesGanado()),
                categoria: simulacion.categoria
            },
            { transaction: transaccion }
        );
        return fila.id;
        });
    }
}

module.exports = SimulacionRepositorySequelize;