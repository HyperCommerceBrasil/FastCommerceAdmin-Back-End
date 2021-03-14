import { Router } from 'express';
import collectionRouter from '@modules/Collection/infra/http/routes/collections.routes';
import productRouter from '@modules/Product/infra/http/routes/product.routes';
import userRouter from '@modules/User/infra/http/routes/user.routes';

const routes = Router();

routes.use('/collections', collectionRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);

export default routes;
