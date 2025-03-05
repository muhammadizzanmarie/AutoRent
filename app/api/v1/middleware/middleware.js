const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar dan ukurannya tidak boleh lebih dari 5MB'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = {
    uploadSingle: upload.single('foto'),
    uploadMultiple: upload.fields([
        { name: 'foto_ktp', maxCount: 1 },
        { name: 'foto_wajah', maxCount: 1 }
    ])
};
