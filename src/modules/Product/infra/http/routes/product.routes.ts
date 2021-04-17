import uploads from '@config/multer';
import { Router } from 'express';

import ProductController from '../controllers/ProductController';

const productController = new ProductController();
const productRouter = Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.index);
productRouter.get('/', productController.index);
productRouter.delete('/:id', productController.delete);
productRouter.put('/:id', productController.update);
productRouter.post('/upload/image', uploads.single("productImage"), productController.upload);

export default productRouter;
