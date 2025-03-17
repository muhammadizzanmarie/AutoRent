const express = require('express');
const multer = require('multer');
const upload = multer().none();

const router = express.Router();
const { 
    createPengembalian, 
    getAllPengembalian, 
    getPengembalianById, 
    updatePengembalian, 
    deletePengembalian 
} = require('./controller.js');

router.post('/create', upload, createPengembalian); 
router.put('/:id', upload, updatePengembalian); 

router.get('/', getAllPengembalian);
router.get('/:id', getPengembalianById);
router.delete('/:id', deletePengembalian);

module.exports = router;
