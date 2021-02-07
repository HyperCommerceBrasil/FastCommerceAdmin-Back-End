import { Router } from 'express';
import collectionRouter from '@modules/Collection/infra/http/routes/collections.routes';

const routes = Router();

routes.use('/collections', collectionRouter);

export default routes;
