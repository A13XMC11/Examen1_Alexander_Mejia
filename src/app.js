const express = require("express");
const cors = require("cors");
const registerInversionModule = require("./lib/Inversion/Infraestructura/http");

function buildApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/api/health", (req, res) => res.json({ ok: true }));

    registerInversionModule(app);

    app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

    
    app.use((err, req, res, next) => {
        const status = err.statusCode || 500;
        if (status >= 500) console.error(err);
        const message = status >= 500 ? "Error interno del servidor" : err.message;
        res.status(status).json({ message });
    });

    return app;
}

module.exports = buildApp;