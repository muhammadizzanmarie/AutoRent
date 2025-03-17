const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./utils/config.js');

const usersRouter = require('./api/v1/users/router.js');
const peminjamanRouter = require('./api/v1/peminjaman/router.js');
const pengembalianRouter = require('./api/v1/pengembalian/router.js'); 
const profileRouter = require('./api/v1/profile/router.js');

dotenv.config();
const app = express();

// Middleware utama
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files untuk upload gambar
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Gunakan router API
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/peminjaman', peminjamanRouter);
app.use('/api/v1/pengembalian', pengembalianRouter);
app.use('/api/v1/profile', profileRouter);

// Cek koneksi database sebelum sync
sequelize.authenticate()
    .then(() => {
        console.log('✅ Koneksi database berhasil.');
        return sequelize.sync(); // Sinkronisasi database
    })
    .then(() => {
        console.log('✅ Database telah disinkronisasi.');
    })
    .catch(err => {
        console.error('❌ Gagal menyambungkan database:', err);
    });

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
