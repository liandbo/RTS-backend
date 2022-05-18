const express = require('express');

const {login, studentRegister, secretaryRegister, DTDTRegister, QLKHRegister, HCTHRegister, getCurrentUSer} = require('../controllers/authController');
const { checkCurrentUser } = require('../middlewares/checkCurrentUser');

const Router = express.Router();

Router.route('/register/student').post(studentRegister);
Router.route('/register/secretary').post(secretaryRegister);
Router.route('/register/DTDT').post(DTDTRegister);
Router.route('/register/QLKH').post(QLKHRegister);
Router.route('/register/HCTH').post(HCTHRegister);
Router.route('/login').post(login);
Router.route('/').get(checkCurrentUser, getCurrentUSer);


module.exports = Router;