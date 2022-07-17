const multer = require('multer');
const fs = require('fs-extra');
const Request = require('../models/Request');
const TicketData = require('../models/TicketData');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/temp");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: fileStorageEngine }).single('upload');

exports.uploadTicketFile = async (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const src = req.file.destination + "/" + req.file.originalname;
            const des = "./assets/uploadfiles/" + req.body.ticket + "/" + req.file.originalname;
            fs.move(src, des, (error) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: 'upload success',
                    });
                }
            });
        }
    })
};

exports.downloadFileMaster = async (req, res, next) => {
    const requestId = req.params.request;
    const FileName = (await Request.findById(requestId)).FileName;
    const location = './assets/masterfiles/' + requestId + '/' + FileName;
    res.download(location, FileName, function (err) {
        next(err);
    });
};

exports.downloadFileTicket = async (req, res, next) => {
    const ticketId = req.params.ticket;
    const FileName = (await TicketData.findById(ticketId)).Data.FileName;
    const location = './assets/uploadfiles/' + ticketId + '/' + FileName;
    res.download(location, FileName, function (err) {
        next(err);
    });
};

