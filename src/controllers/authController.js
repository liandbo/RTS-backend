const Student = require('../models/Student');
const Secretary = require('../models/Secretary');
const DTDT = require('../models/DTDT');
const QLKH = require('../models/QLKH');
const HCTH = require('../models/HCTH');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.studentRegister = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const user = await Student.create(req.body);
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {token, userName: user.Name}
        });
    } catch (error) {
        next(error);
    }
}

exports.secretaryRegister = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const user = await Secretary.create(req.body);
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {token, userName: user.Name}
        });
    } catch (error) {
        next(error);
    }
}
exports.DTDTRegister = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const user = await DTDT.create(req.body);
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {token, userName: user.Name}
        });
    } catch (error) {
        next(error);
    }
}
exports.QLKHRegister = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const user = await QLKH.create(req.body);
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {token, userName: user.Name}
        });
    } catch (error) {
        next(error);
    }
}
exports.HCTHRegister = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const user = await HCTH.create(req.body);
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {token, userName: user.Name}
        });
    } catch (error) {
        next(error);
    }
}

async function FindAccount(ID) {
    const student = await Student.findOne({IDnumber: ID})
    if (student) {
        return student;
    }
    const secretary = await Secretary.findOne({IDnumber: ID})
    if (secretary) {
        return secretary;
    }
    const dtdt = await DTDT.findOne({IDnumber: ID})
    if (dtdt) {
        return dtdt;
    }
    const qlkh = await QLKH.findOne({IDnumber: ID})
    if (qlkh) {
        return qlkh;
    }
    const hcth = await HCTH.findOne({IDnumber: ID})
    if (hcth) {
        return hcth;
    }
}

exports.login = async (req, res, next) => {
    try {
        req.body['IDnumber'] = req.body['IDnumber'].toLowerCase();
        const result = await FindAccount(req.body.IDnumber)
        if (!result) {
            const err = new Error('ID is not correct');
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.Password, result.Password)) {
            const token = jwt.sign({userId: result._id}, process.env.APP_SECRET);
            res.status(200).json({
                status: "success",
                data: {
                    token, userName: result.Name, Department: result.Department, IDnumber: result.IDnumber, Role: result.Role
                }
            })
        } else {
            const err = new Error('Pasword is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
}

exports.getCurrentUSer = async (req, res, next) => {
    try {
        const data = { user: null}
        if (req.user) {
            const user = await Student.findOne({_id: req.user.userId}) !== {} 
                ? await Student.findOne({_id: req.user.userId})
                : await Secretary.findOne({_id: req.user.userId}) !== {}
                ? await Secretary.findOne({_id: req.user.userId})
                : {};
            data.user = {userName: user.Name}
        }
        res.status(200).json({
            status: 'Success',
            data: data
        }) 
    } catch (err) {
        res.json(err);
    }
}