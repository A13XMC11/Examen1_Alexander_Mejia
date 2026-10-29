class SimulacionController {
    constructor({ simularInversion }) {
        this.simularInversion = simularInversion;
    }

    simular = async (req, res) => {
        const resultado = await this.simularInversion.ejecutar(req.body);
        res.status(201).json(resultado);
    };
}

module.exports = SimulacionController;
