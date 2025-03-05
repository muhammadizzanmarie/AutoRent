const Pengembalian = require('./models.js');


const createPengembalian = async (req, res) => {
    try {
        const { peminjaman_id, kondisi_kendaraan, bensin_akhir, sisa_etol, tanggal_pengembalian, keterangan, status } = req.body;
        
        const pengembalian = await Pengembalian.create({
            peminjaman_id, kondisi_kendaraan, bensin_akhir, sisa_etol, tanggal_pengembalian, keterangan, status
        });

        res.status(201).json({ message: 'Pengembalian berhasil dibuat', pengembalian });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const getAllPengembalian = async (req, res) => {
    try {
        const pengembalian = await Pengembalian.findAll();
        res.status(200).json(pengembalian);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const getPengembalianById = async (req, res) => {
    try {
        const { id } = req.params;
        const pengembalian = await Pengembalian.findByPk(id);
        if (!pengembalian) return res.status(404).json({ message: 'Pengembalian tidak ditemukan' });

        res.status(200).json(pengembalian);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};


const updatePengembalian = async (req, res) => {
    try {
        const { id } = req.params;
        const { peminjaman_id, kondisi_kendaraan, bensin_akhir, sisa_etol, tanggal_pengembalian, keterangan, status } = req.body;

        const pengembalian = await Pengembalian.findByPk(id);
        if (!pengembalian) return res.status(404).json({ message: 'Pengembalian tidak ditemukan' });

        pengembalian.set({ peminjaman_id, kondisi_kendaraan, bensin_akhir, sisa_etol, tanggal_pengembalian, keterangan, status });

        await pengembalian.save();
        res.status(200).json({ message: 'Pengembalian berhasil diperbarui', pengembalian });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const deletePengembalian = async (req, res) => {
    try {
        const { id } = req.params;

        const pengembalian = await Pengembalian.findByPk(id);
        if (!pengembalian) return res.status(404).json({ message: 'Pengembalian tidak ditemukan' });

        await pengembalian.destroy();
        res.status(200).json({ message: 'Pengembalian berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

module.exports = {
    createPengembalian,
    getAllPengembalian,
    getPengembalianById,
    updatePengembalian,
    deletePengembalian
};
