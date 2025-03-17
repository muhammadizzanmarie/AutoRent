const { DataTypes } = require('sequelize');
const sequelize = require('../../../utils/config.js');

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING
    },
    background: {
        type: DataTypes.STRING
    },
    foto_profile: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
});

module.exports = Profile;
