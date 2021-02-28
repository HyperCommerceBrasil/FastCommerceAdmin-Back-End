import { Router } from 'express';
import collectionRouter from '@modules/Collection/infra/http/routes/collections.routes';
import productRouter from '@modules/Product/infra/http/routes/product.routes';

const routes = Router();

routes.use('/collections', collectionRouter);
routes.use('/products', productRouter);

export default routes;
