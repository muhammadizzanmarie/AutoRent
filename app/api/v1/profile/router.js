const express = require('express');
const { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile } = require('./controller.js');
const { uploadMultiple } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.post('/create', uploadMultiple, createProfile);
router.put('/:id', uploadMultiple, updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;
