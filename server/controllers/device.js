const mongoose = require('mongoose');
const Device = require('./../models/device');

exports.get_devices = function (req, res) {
    req.query.limit = parseInt(req.query.limit);
    req.query.page = parseInt(req.query.page);

    var perPage = req.query.limit || 50;
    var page = req.query.page > 0 ? req.query.page - 1 : 0;

    Device.find()
        .select('deviceName cost expiry warranty deviceImage')
        .limit(perPage)
        .skip(parseInt(perPage * page))
        .sort({
            created_at: "asc"
        })
        .lean()
        .exec(function (err, devices) {
            if (err)
                return res.status(500).json({
                    message: err.message
                });
            return res.status(200).json({
                count: devices.length,
                status: "success",
                data: devices
            });
        });
};

exports.create_device = function (req, res, next) {
    const device = new Device(req.body);
    device.save(function (err, device) {
        if (err) {
            res.status(400).send({
                message: 'Create device Failed!',
                errors: err
            });
        } else {
            res.status(200).send({
                message: 'Created Device Successfully',
                data: device
            });
        }
    })
};

exports.delete_device = function (req, res, next) {
    var id;
    if (mongoose.Types.ObjectId(req.params.deviceId)) {
        id = mongoose.Types.ObjectId(req.params.deviceId);
    } else {
        res.status(400).send({
            message: 'Invalid Id!'
        });
    }
    Device.findByIdAndRemove(id, function (err, device) {
        if (err) {
            res.status(400).send({
                message: 'Failed remove device!',
                errors: err
            });
        } else {
            res.status(200).send({
                message: 'Deleted device successfully!'
            });
        }
    })
}


exports.update_device = function (req, res) {
    Device.findByIdAndUpdate(req.params.deviceId, req.body, {
        new: true
    }, function (err, device) {
        if (err) {
            res.status(400).send({
                status: 'Failed!',
                message: 'Failed update device!',
                errors: err
            });
        } else if (device == null || device == undefined) {
            res.status(404).send({
                status: 'Failed!',
                message: 'Drevice not found!'
            });
        } else {
            res.status(200).send({
                message: 'Updated Device successfully!',
                data: device
            });
        }
    })
}