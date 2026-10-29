const { DataTypes } = require("sequelize");
const { obtenerSequelize } = require("../../../Infraestructura/database/Sequelize");

const ClienteModel = obtenerSequelize().define(
  "Cliente",
  {
    
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombres: { type: DataTypes.STRING(120), allowNull: false },
    cedula: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(254), allowNull: false },
    celular: { type: DataTypes.STRING(10), allowNull: false }
  },
  { tableName: "clientes" }
);

module.exports = ClienteModel;