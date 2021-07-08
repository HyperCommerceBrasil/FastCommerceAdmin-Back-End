import { Router } from 'express';

import customerEnsureAuthenticate from './../middlewares/CustomerEnsureAuthenticated';
import handlebars from 'handlebars';
import fs from 'fs';

import CustomerController from '../controllers/customerController';

import AuthCustomerController from '../controllers/authCustomerController';
import Mailer from '../../../../../config/email/mailConfig';
import nodemailer from 'nodemailer';

const customerController = new CustomerController();
const authCustomerController = new AuthCustomerController();
const customerRouter = Router();

customerRouter.post('/', customerController.create);
customerRouter.put('/', customerEnsureAuthenticate, customerController.update);
customerRouter.post('/auth', authCustomerController.login);
customerRouter.get('/', customerEnsureAuthenticate, customerController.index);
customerRouter.post(
  '/sendlink_resetpassword',
  authCustomerController.generateResetLinkPassword,
);

customerRouter.post('/reset_password', authCustomerController.resetPassword);

export default customerRouter;
