import { Router } from 'express';

import ProductController from '../controllers/ProductController';

const productController = new ProductController();
const productRouter = Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.index);
productRouter.get('/', productController.index);
productRouter.delete('/:id', productController.delete);
productRouter.put('/:id', productController.update);

export default productRouter;
