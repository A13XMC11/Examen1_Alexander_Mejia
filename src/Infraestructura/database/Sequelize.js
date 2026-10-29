const { Sequelize } = require("sequelize");
const cargarModelos = require("./cargarModelos");

let instancia = null;


function obtenerSequelize() {

    if (!instancia) {
        instancia = new Sequelize(process.env.SQL_URL, {
        dialect: "postgres",
        logging: false,
        define: {
            underscored: true,
            freezeTableName: true,
            createdAt: "creadoEn",
            updatedAt: "actualizadoEn"
        }
        });
    }
    return instancia;
}


async function connection() {
    const sequelize = obtenerSequelize();
    await sequelize.authenticate();
    cargarModelos();
    await sequelize.sync({ alter: process.env.SQL_SYNC_ALTER !== "false" });
    console.log(`Conectado a PostgreSQL: ${sequelize.getDatabaseName()}`);
}

async function disconnect() {
    await obtenerSequelize().close();
}

module.exports = { obtenerSequelize, connection, disconnect };