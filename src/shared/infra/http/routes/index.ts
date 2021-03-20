import { Router } from 'express';
import collectionRouter from '@modules/Collection/infra/http/routes/collections.routes';
import productRouter from '@modules/Product/infra/http/routes/product.routes';
import userRouter from '@modules/User/infra/http/routes/user.routes';
import authRouter from '@modules/User/infra/http/routes/auth.routes';
import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';
const routes = Router();

routes.use('/collections', ensureAuthenticate, collectionRouter);
routes.use('/products',  ensureAuthenticate, productRouter);
routes.use('/users', userRouter);
routes.use('/auth', authRouter);
export default routes;
