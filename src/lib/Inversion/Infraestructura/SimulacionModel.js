const { DataTypes } = require("sequelize");
const { obtenerSequelize } = require("../../../Infraestructura/database/Sequelize");
const ClienteModel = require("./ClienteModel");

const SimulacionModel = obtenerSequelize().define(
  "Simulacion",
  {

    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    capital: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    tasaPorcentaje: { type: DataTypes.DECIMAL(7, 4), allowNull: false },
    periodosAnuales: { type: DataTypes.SMALLINT, allowNull: false },
    anios: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
    montoFinal: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
    interesGanado: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
    categoria: { type: DataTypes.SMALLINT, allowNull: true }
  },
  { tableName: "simulaciones" }
);


ClienteModel.hasMany(SimulacionModel, {
  foreignKey: { name: "clienteId", allowNull: false },
  onDelete: "RESTRICT"
});
SimulacionModel.belongsTo(ClienteModel, { foreignKey: { name: "clienteId", allowNull: false } });

module.exports = SimulacionModel;