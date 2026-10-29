const buildApp = require("./app");
const { connection, disconnect } = require("./Infraestructura/database/Sequelize");

async function start() {
    const port = Number(process.env.PORT) || 3977;

    await connection();

    const server = buildApp().listen(port, () => {
        
        console.log(`Servidor corriendo en el puerto ${port}`);
    });

    const cerrar = async () => {
        server.close();
        await disconnect();
        process.exit(0);
    };
    process.on("SIGINT", cerrar);
    process.on("SIGTERM", cerrar);
}

start().catch((error) => {
    console.error("Fallo al iniciar la aplicación:", error);
    process.exit(1);
});