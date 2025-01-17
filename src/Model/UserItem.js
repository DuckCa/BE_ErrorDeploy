const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const UserItem = sequelize.define(
  "UserItem",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //True sẽ là tác phẩm của account đó đăng, còn false sẽ là tác phẩm người đó lưu vào wishlist
  },
  {
    tableName: "UserItem",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

// Synchronize the model with the database
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = UserItem;
