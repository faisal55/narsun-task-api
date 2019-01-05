const mongoose = require('mongoose');
const Setting = require('./../models/setting');

exports.get_settings = function (req, res) {
    req.query.limit = parseInt(req.query.limit);
    req.query.page = parseInt(req.query.page);

    var perPage = req.query.limit || 50;
    var page = req.query.page > 0 ? req.query.page - 1 : 0;

    Setting.find()
        .limit(perPage)
        .skip(parseInt(perPage * page))
        .sort({
            created_at: "asc"
        })
        .lean()
        .exec(function (err, settings) {
            if (err)
                return res.status(500).json({
                    message: err.message
                });
            return res.status(200).json({
                count: settings.length,
                status: "success",
                data: settings
            });
        });
};

exports.create_settings = function (req, res, next) {
    const settings = new Setting(req.body);
    settings.save(function (err, setting) {
        if (err) {
            res.status(400).send({
                message: 'Create Settings Failed!',
                errors: err
            });
        } else {
            res.status(200).send({
                message: 'Created Settings Successfully',
                data: settings
            });
        }
    })
};

exports.update_settings = function (req, res) {
    Setting.findByIdAndUpdate(req.params.settingId, req.body, {
        new: true
    }, function (err, settings) {
        if (err) {
            res.status(400).send({
                status: 'Failed!',
                message: 'Failed update settings!',
                errors: err
            });
        } else if (settings == null || settings == undefined) {
            res.status(404).send({
                status: 'Failed!',
                message: 'Settings not found!'
            });
        } else {
            res.status(200).send({
                message: 'Updated settings successfully!',
                data: settings
            });
        }
    })
}