const bcrypt = require('bcrypt');
const User = require('./models.js');

const register = async (req, res) => {
    try {
        const { username, nama, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, nama, email, password: hashedPassword, role });

        res.status(201).json({ message: 'User berhasil didaftarkan', user });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, nama, email, password, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        if (password) user.password = await bcrypt.hash(password, 10);
        if (username) user.username = username;
        if (nama) user.nama = nama;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: 'User berhasil diperbarui', user });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

        await user.destroy();
        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};


module.exports = {
    register,
    getUsers,
    updateUser,
    deleteUser
};
