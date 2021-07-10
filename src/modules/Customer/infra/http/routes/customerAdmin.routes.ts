import { Router } from 'express';

import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';

import CustomerController from '../controllers/customerController';

import AuthCustomerController from '../controllers/authCustomerController';

const customerController = new CustomerController();
const customerRouter = Router();

customerRouter.get('/', customerController.listAll);
customerRouter.get('/:idCustomer', customerController.listOne);

export default customerRouter;
