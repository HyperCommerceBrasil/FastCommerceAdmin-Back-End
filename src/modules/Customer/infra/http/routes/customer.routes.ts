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
customerRouter.post('/testmail', async (req, res) => {
  const mailer = await Mailer();

  const pathTemplate = fs
    .readFileSync(
      '/home/thalesmorais/develop/fastcommerce/FastCommerceAdmin-Back-End/src/config/email/templates/welcomeuser.hbs',
    )
    .toString('utf-8');

  const templateParse = handlebars.compile(pathTemplate);
  const emailHTML = templateParse({
    username: 'Thales',
  });

  const info = await mailer.sendMail({
    from: '"thalesmoraisdealmeida@outlook.com', // sender address
    to: 'thales.morais21@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: emailHTML, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.json({ messsage: 'email enviado' }).status(200);
});

export default customerRouter;
