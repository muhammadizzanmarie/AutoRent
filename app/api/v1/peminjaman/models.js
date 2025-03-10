const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../../utils/config.js");
const User = require('../users/models.js'); 

const Peminjaman = sequelize.define('Peminjaman', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    no_telepon: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    instansi: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    kendaraan: {
        type: DataTypes.ENUM('motor', 'mobil'),
        allowNull: false
    },
    kondisi_kendaraan: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bensin_awal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sisa_etol: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tanggal_peminjaman: {
        type: DataTypes.DATE,
        allowNull: false
    },
    foto_ktp: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    foto_wajah: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'peminjaman',

});


Peminjaman.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Peminjaman;
