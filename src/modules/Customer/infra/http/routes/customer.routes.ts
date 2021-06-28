import { Router } from 'express';

import customerEnsureAuthenticate from './../middlewares/CustomerEnsureAuthenticated';

import CustomerController from '../controllers/customerController';

import AuthCustomerController from '../controllers/authCustomerController';

const customerController = new CustomerController();
const authCustomerController = new AuthCustomerController();
const customerRouter = Router();

customerRouter.post('/', customerController.create);
customerRouter.put('/', customerController.update);
customerRouter.post('/auth', authCustomerController.login);
customerRouter.get('/', customerEnsureAuthenticate, customerController.index);

export default customerRouter;
