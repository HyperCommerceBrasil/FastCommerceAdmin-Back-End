import { Router } from 'express';

import OrdersController from '../controllers/ordersController';

const ordersController = new OrdersController();

const ordersRouter = Router();

ordersRouter.post('/', ordersController.create);
ordersRouter.post('/:orderId', ordersController.getOne);

export default ordersRouter;
