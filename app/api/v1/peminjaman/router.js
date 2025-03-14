const express = require('express');
const router = express.Router();
const { createPeminjaman, getAllPeminjaman, getPeminjamanById, updatePeminjaman, deletePeminjaman } = require('./controller.js');
const { uploadMultiple } = require('../middleware/middleware.js');

router.post('/create', uploadMultiple, createPeminjaman);
router.get('/', getAllPeminjaman);
router.get('/:id', getPeminjamanById);
router.put('/:id', uploadMultiple, updatePeminjaman);
router.delete('/:id', deletePeminjaman);

module.exports = router;
