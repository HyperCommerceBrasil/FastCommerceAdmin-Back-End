import multerConfig from '@config/multer';
import multer from 'multer';
import { Router } from 'express';

import ProductController from '../controllers/ProductController';

import SearchController from '../controllers/SearchController';

const productController = new ProductController();
const searchController = new SearchController();
const productRouter = Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.index);
productRouter.get('/search', searchController.search);
productRouter.get('/listone/:id', productController.indexOne);
productRouter.delete('/:id', productController.delete);
productRouter.put('/:id', productController.update);
productRouter.delete('/image/delete/:imageId', productController.deleteImage);
productRouter.post(
  '/upload/image',
  multer(multerConfig).single('productImage'),

  productController.upload,
);

export default productRouter;
