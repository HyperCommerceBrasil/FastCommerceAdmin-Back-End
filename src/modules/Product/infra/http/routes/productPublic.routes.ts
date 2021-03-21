import { Router } from 'express';

import ProductPublicController from '../controllers/ProductPublicController';

const productPublicController = new ProductPublicController();
const productRouter = Router();

productRouter.get('/', productPublicController.index);
productRouter.get('/trends', productPublicController.indexTrends);


export default productRouter;

