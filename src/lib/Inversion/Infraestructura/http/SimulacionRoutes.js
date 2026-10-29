const express = require("express");
const envolverAsync = require("../../../../Infraestructura/http/envolverAsync");

module.exports = function SimulacionRoutes(controller) {

    const router = express.Router();
    router.post("/", envolverAsync(controller.simular));
    return router;
};