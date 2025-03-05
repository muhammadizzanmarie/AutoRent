const express = require('express');
const router = express.Router();
const { createPengembalian, getAllPengembalian, getPengembalianById, updatePengembalian, deletePengembalian } = require('./controller.js');

router.post('/create', createPengembalian);
router.get('/', getAllPengembalian);
router.get('/:id', getPengembalianById);
router.put('/:id', updatePengembalian);
router.delete('/:id', deletePengembalian);

module.exports = router;
