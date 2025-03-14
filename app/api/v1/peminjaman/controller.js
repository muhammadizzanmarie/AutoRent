const Peminjaman = require('./models.js');

const createPeminjaman = async (req, res) => {
    try {
        for (let key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = req.body[key].trim();
            }
        }

        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        const user_id = req.body.user_id;
        const nama = req.body.nama;
        const alamat = req.body["alamat"] || req.body["alamat "]; 
        const no_telepon = req.body.no_telepon;
        const instansi = req.body.instansi;
        const kendaraan = req.body.kendaraan;
        const kondisi_kendaraan = req.body.kondisi_kendaraan;
        const bensin_awal = req.body.bensin_awal || 0;
        const sisa_etol = req.body.sisa_etol || 0;
        const tanggal_peminjaman = req.body.tanggal_peminjaman;

        if (!user_id || !nama || !alamat || !no_telepon || !kendaraan || !tanggal_peminjaman) {
            return res.status(400).json({ message: 'Mohon isi semua field yang wajib' });
        }

        // Buat URL untuk gambar yang diupload
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const foto_ktp = req.files?.foto_ktp?.[0] ? baseUrl + req.files.foto_ktp[0].filename : null;
        const foto_wajah = req.files?.foto_wajah?.[0] ? baseUrl + req.files.foto_wajah[0].filename : null;

        const peminjaman = await Peminjaman.create({
            user_id,
            nama,
            alamat,
            no_telepon,
            instansi: instansi || null,
            kendaraan,
            kondisi_kendaraan: kondisi_kendaraan || null,
            bensin_awal,
            sisa_etol,
            tanggal_peminjaman,
            foto_ktp,
            foto_wajah
        });

        res.status(201).json({ message: 'Peminjaman berhasil dibuat', peminjaman });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat membuat peminjaman', error: error.message });
    }
};

const getAllPeminjaman = async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findAll();
        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data peminjaman', error: error.message });
    }
};

const getPeminjamanById = async (req, res) => {
    try {
        const { id } = req.params;
        const peminjaman = await Peminjaman.findByPk(id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });

        res.status(200).json(peminjaman);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data peminjaman', error: error.message });
    }
};

const updatePeminjaman = async (req, res) => {
    try {
        // Bersihkan spasi tambahan di req.body
        for (let key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = req.body[key].trim();
            }
        }

        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        const { id } = req.params;
        const peminjaman = await Peminjaman.findByPk(id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });

        // Base URL untuk file
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const foto_ktp = req.files?.foto_ktp?.[0] ? baseUrl + req.files.foto_ktp[0].filename : peminjaman.foto_ktp;
        const foto_wajah = req.files?.foto_wajah?.[0] ? baseUrl + req.files.foto_wajah[0].filename : peminjaman.foto_wajah;

        await peminjaman.update({
            user_id: req.body.user_id || peminjaman.user_id,
            nama: req.body.nama || peminjaman.nama,
            alamat: req.body.alamat || req.body["alamat "] || peminjaman.alamat,
            no_telepon: req.body.no_telepon || peminjaman.no_telepon,
            instansi: req.body.instansi || peminjaman.instansi,
            kendaraan: req.body.kendaraan || peminjaman.kendaraan,
            kondisi_kendaraan: req.body.kondisi_kendaraan || peminjaman.kondisi_kendaraan,
            bensin_awal: req.body.bensin_awal || peminjaman.bensin_awal,
            sisa_etol: req.body.sisa_etol || peminjaman.sisa_etol,
            tanggal_peminjaman: req.body.tanggal_peminjaman || peminjaman.tanggal_peminjaman,
            foto_ktp,
            foto_wajah
        });

        res.status(200).json({ message: 'Peminjaman berhasil diperbarui', peminjaman });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui peminjaman', error: error.message });
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
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus peminjaman', error: error.message });
    }
};

module.exports = { createPeminjaman, getAllPeminjaman, getPeminjamanById, updatePeminjaman, deletePeminjaman };
