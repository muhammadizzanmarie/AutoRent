const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("db_rental", "izzan", "bismillah", {
    host: "localhost",
    dialect: "mysql"
});

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    }
}, {
    timestamps: true
});

sequelize.sync()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database error:", err));

module.exports = { sequelize, User };
