const mongoose = require('mongoose');
const User = require('./../models/user');

exports.get_users = function (req, res) {
    req.query.limit = parseInt(req.query.limit);
    req.query.page = parseInt(req.query.page);

    var perPage = req.query.limit || 50;
    var page = req.query.page > 0 ? req.query.page - 1 : 0;

    User.find()
        .populate('device')
        .limit(perPage)
        .skip(parseInt(perPage * page))
        .sort({
            created_at: "asc"
        })
        .lean()
        .exec(function (err, users) {
            if (err)
                return res.status(500).json({
                    message: err.message
                });
            return res.status(200).json({
                count: users.length,
                status: "success",
                data: users
            });
        });
};

exports.create_user = function (req, res, next) {
    const user = new User(req.body);
    user.save(function (err, user) {
        if (err) {
            res.status(400).send({
                message: 'Create User Failed!',
                errors: err
            });
        } else {
            return res.status(200).send({
                message: 'Created User Successfully',
                data: user
            });
        }
    })
}

exports.delete_user = function (req, res, next) {

    var id;
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        id = mongoose.Types.ObjectId(req.params.userId);
    } else {
        return res.status(400).json({
            message: "Invalid Id"
        });
    }
    User.findByIdAndRemove(id, function (err, user) {
        if (err) {
            res.status(404).json({
                message: 'User Not Found!',
                errors: err
            })
        } else {
            res.status(200).send({
                message: 'User Deleted!',
                status: 'success'
            });
        }
    })
};

exports.update_user = function (req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    }, function (err, user) {
        if (err) {
            res.status(400).send({
                status: 'Failed!',
                message: 'Failed update user!!',
                errors: err
            });
        } else if (user == null || user == undefined) {
            res.status(404).send({
                status: 'Failed!',
                message: 'User not found!'
            });
        } else {
            res.status(200).send({
                message: 'Updated User successfully!',
                data: user
            });
        }
    })
}