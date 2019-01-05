const express = require('express');
const router = express.Router();
const settingController = require('./../controllers/setting');

// GET SETTINGS
router.get('/', settingController.get_settings);

// CREATE SETTINGS
router.post('/', settingController.create_settings);

// UPDATE SETTINGS
router.patch('/:settingId', settingController.update_settings);

module.exports = router;