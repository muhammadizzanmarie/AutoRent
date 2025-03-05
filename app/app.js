const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./utils/config.js');
const usersRouter = require('./api/v1/users/router.js');
const peminjamanRouter = require('./api/v1/peminjaman/router.js');
const pengembalianRouter = require('./api/v1/pengembalian/router.js'); // Import router pengembalian

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));


app.use('/api/v1/users', usersRouter);
app.use('/api/v1/peminjaman', peminjamanRouter);
app.use('/api/v1/pengembalian', pengembalianRouter); 


sequelize.sync()
    .then(() => {
        console.log('Database terhubung dan tabel siap digunakan.');
    })
    .catch(err => {
        console.error('Gagal menyambungkan database:', err);
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
