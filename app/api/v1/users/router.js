const express = require('express');
const router = express.Router();
const { register, getUsers, updateUser, deleteUser } = require('./controller.js');

router.post('/register', register);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
