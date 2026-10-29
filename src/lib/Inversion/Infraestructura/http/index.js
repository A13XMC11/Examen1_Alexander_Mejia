const SimulacionRoutes = require("./SimulacionRoutes");
const SimulacionController = require("./SimulacionController");

const SimulacionRepositorySequelize = require("../SimulacionRepositorySequelize");
const SimularInversion = require("../../Aplicacion/SimularInversion");


module.exports = function registerInversionModule(app) {
    const repo = new SimulacionRepositorySequelize();
    const controller = new SimulacionController({
        simularInversion: new SimularInversion(repo)
    });
    app.use("/api/simulaciones", SimulacionRoutes(controller));
};