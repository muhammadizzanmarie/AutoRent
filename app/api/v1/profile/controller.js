const Profile = require('./models.js');

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile tidak ditemukan' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProfile = async (req, res) => {
    try {
        const { nama, username, status } = req.body;
        
        // Buat URL untuk gambar
        const background = req.files['background'] 
            ? `${req.protocol}://${req.get('host')}/uploads/${req.files['background'][0].filename}` 
            : null;

        const foto_profile = req.files['foto_profile'] 
            ? `${req.protocol}://${req.get('host')}/uploads/${req.files['foto_profile'][0].filename}` 
            : null;

        // Simpan ke database
        const profile = await Profile.create({ nama, username, status, background, foto_profile });
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile tidak ditemukan' });

        const { nama, username, status } = req.body;

        // Perbarui URL gambar jika ada file baru
        const background = req.files['background'] 
            ? `${req.protocol}://${req.get('host')}/uploads/${req.files['background'][0].filename}`
            : profile.background;

        const foto_profile = req.files['foto_profile'] 
            ? `${req.protocol}://${req.get('host')}/uploads/${req.files['foto_profile'][0].filename}`
            : profile.foto_profile;

        // Update data
        profile.nama = nama || profile.nama;
        profile.username = username || profile.username;
        profile.status = status || profile.status;
        profile.background = background;
        profile.foto_profile = foto_profile;

        await profile.save();
        res.json({ message: 'Profile berhasil diperbarui', profile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile tidak ditemukan' });

        // Hapus file gambar dari server
        const fs = require('fs');
        const path = require('path');

        if (profile.background) {
            const bgPath = path.join(__dirname, '..', 'public', 'uploads', path.basename(profile.background));
            if (fs.existsSync(bgPath)) fs.unlinkSync(bgPath);
        }

        if (profile.foto_profile) {
            const profilePath = path.join(__dirname, '..', 'public', 'uploads', path.basename(profile.foto_profile));
            if (fs.existsSync(profilePath)) fs.unlinkSync(profilePath);
        }

        await profile.destroy();
        res.json({ message: 'Profile berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile };
