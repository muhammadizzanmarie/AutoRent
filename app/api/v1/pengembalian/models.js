const { DataTypes } = require('sequelize');
const sequelize = require('../../../utils/config.js'); // Sesuaikan dengan path config DB
const Peminjaman = require('../peminjaman/models.js'); // Import model peminjaman

const Pengembalian = sequelize.define('Pengembalian', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    peminjaman_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Peminjaman,
            key: 'id'
        }
    },
    kondisi_kendaraan: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bensin_akhir: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sisa_etol: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tanggal_pengembalian: {
        type: DataTypes.DATE,
        allowNull: false
    },
    keterangan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('diproses', 'telah dikembalikan'),
        defaultValue: 'diproses'
    },
}, {
    tableName: 'pengembalian',
});

module.exports = Pengembalian;
