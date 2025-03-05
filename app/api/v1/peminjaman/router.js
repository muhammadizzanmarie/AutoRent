const express = require('express');
const router = express.Router();
const controller = require('./controller.js'); 
const { uploadMultiple } = require('../middleware/middleware.js');

router.post('/create', uploadMultiple, controller.createPeminjaman);
router.get('/', controller.getAllPeminjaman);
router.get('/:id', controller.getPeminjamanById);
router.put('/:id', controller.updatePeminjaman);
router.delete('/:id', controller.deletePeminjaman);

module.exports = router;
