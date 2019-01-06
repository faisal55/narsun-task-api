const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');

// GET ALL USERS
router.get('/', userController.get_users);

// CREATE A USER
router.post('/', userController.create_user);

// REMOVE A USER
router.delete('/:userId', userController.delete_user);

// UPDATE A USER
router.put('/:userId', userController.update_user);

module.exports = router;