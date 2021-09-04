import { Router } from 'express';

import customerEnsureAuthenticate from '@modules/Customer/infra/http/middlewares/CustomerEnsureAuthenticated';
import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/ordersController';

const ordersController = new OrdersController();

const ordersRouter = Router();

ordersRouter.post('/', customerEnsureAuthenticate, ordersController.create);
ordersRouter.post(
  '/:orderId',
  customerEnsureAuthenticate,
  ordersController.getOne,
);
ordersRouter.get('/', ensureAuthenticate, ordersController.index);

export default ordersRouter;
