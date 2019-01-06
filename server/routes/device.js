const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const deviceController = require('./../controllers/device');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
        // for Mac
        // cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



// GET ALL DEVICES
router.get('/', deviceController.get_devices);

// ADD/CREATE A DEVICE
router.post('/', deviceController.create_device);

// REMOVE A USER
router.delete('/:deviceId', deviceController.delete_device);

// UPDATE A DEVICE
router.put('/:deviceId', deviceController.update_device);

module.exports = router;