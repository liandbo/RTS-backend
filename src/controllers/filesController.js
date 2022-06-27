const multer = require('multer');
const fs = require('fs-extra');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/temp");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine }).single('upload');

exports.uploadTicketFile = async (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            console.log(req.file.originalname)
            console.log(req.file.destination)
            console.log(req.body.ticket)
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
            })

        }
    })
}