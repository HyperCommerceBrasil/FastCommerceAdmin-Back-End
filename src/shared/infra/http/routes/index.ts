import { Router } from 'express';
import collectionRouter from '@modules/Collection/infra/http/routes/collections.routes';
import productRouter from '@modules/Product/infra/http/routes/product.routes';
import userRouter from '@modules/User/infra/http/routes/user.routes';
import customerRouter from '@modules/Customer/infra/http/routes/customer.routes';
import supplierRouter from '@modules/Supplier/infra/http/routes/supplier.routes';

import customerAdminRouter from '@modules/Customer/infra/http/routes/customerAdmin.routes';
import authRouter from '@modules/User/infra/http/routes/auth.routes';
import publicProductsRouter from '@modules/Product/infra/http/routes/productPublic.routes';
import ordersRouter from '@modules/Order/infra/http/routes/orders.routes';
import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';
import customerEnsureAuthenticate from '@modules/Customer/infra/http/middlewares/CustomerEnsureAuthenticated';

const routes = Router();

routes.use('/collections', collectionRouter);
routes.use('/products', ensureAuthenticate, productRouter);
routes.use('/users', userRouter);
routes.use('/customers', customerRouter);
routes.use('/admin/customers', ensureAuthenticate, customerAdminRouter);
routes.use('/auth', authRouter);
routes.use('/public/products', publicProductsRouter);
routes.use('/orders', ordersRouter);

routes.use('/suppliers', ensureAuthenticate, supplierRouter);

export default routes;
