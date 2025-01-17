const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const RequestHistory = sequelize.define(
  "RequestHistory",
  {
    _UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    _RequestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    _dayRequest: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Request_History",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = RequestHistory;
