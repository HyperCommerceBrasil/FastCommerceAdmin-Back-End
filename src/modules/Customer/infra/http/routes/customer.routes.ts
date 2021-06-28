import { Router } from 'express';

import CustomerController from '../controllers/customerController';

const customerController = new CustomerController();
const customerRouter = Router();

customerRouter.post('/', customerController.create);
customerRouter.put('/', customerController.update);

export default customerRouter;
