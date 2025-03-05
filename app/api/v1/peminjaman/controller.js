const Peminjaman = require('./models.js');

const createPeminjaman = async (req, res) => {
    try {
        const { user_id, nama, alamat, no_telepon, instansi, kendaraan, kondisi_kendaraan, bensin_awal, sisa_etol, tanggal_peminjaman } = req.body;
        const foto_ktp = req.files?.foto_ktp[0]?.filename;
        const foto_wajah = req.files?.foto_wajah[0]?.filename;

        const peminjaman = await Peminjaman.create({ user_id, nama, alamat, no_telepon, instansi, kendaraan, kondisi_kendaraan, bensin_awal, sisa_etol, tanggal_peminjaman, foto_ktp, foto_wajah });

        res.status(201).json({ message: 'Peminjaman berhasil dibuat', peminjaman });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const getAllPeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findAll();
        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const getPeminjamanById = async (req, res) => {
    try {
        const { id } = req.params;
        const peminjaman = await Peminjaman.findByPk(id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });

        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const updatePeminjaman = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, nama, alamat, no_telepon, instansi, kendaraan, kondisi_kendaraan, bensin_awal, sisa_etol, tanggal_peminjaman } = req.body;

        const peminjaman = await Peminjaman.findByPk(id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });

        if (user_id) peminjaman.user_id = user_id;
        if (nama) peminjaman.nama = nama;
        if (alamat) peminjaman.alamat = alamat;
        if (no_telepon) peminjaman.no_telepon = no_telepon;
        if (instansi) peminjaman.instansi = instansi;
        if (kendaraan) peminjaman.kendaraan = kendaraan;
        if (kondisi_kendaraan) peminjaman.kondisi_kendaraan = kondisi_kendaraan;
        if (bensin_awal) peminjaman.bensin_awal = bensin_awal;
        if (sisa_etol) peminjaman.sisa_etol = sisa_etol;
        if (tanggal_peminjaman) peminjaman.tanggal_peminjaman = tanggal_peminjaman;

        await peminjaman.save();
        res.status(200).json({ message: 'Peminjaman berhasil diperbarui', peminjaman });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const deletePeminjaman = async (req, res) => {
    try {
        const { id } = req.params;

        const peminjaman = await Peminjaman.findByPk(id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });

        await peminjaman.destroy();
        res.status(200).json({ message: 'Peminjaman berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

module.exports = { createPeminjaman, getAllPeminjaman, getPeminjamanById, updatePeminjaman, deletePeminjaman };
