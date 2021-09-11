import { Router } from 'express';

import SupplierController from '../controllers/SupplierController';
import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';

const supplierController = new SupplierController();
const supplierRouter = Router();

supplierRouter.post('/', ensureAuthenticate, supplierController.create);
supplierRouter.get('/', supplierController.index);
supplierRouter.put('/', supplierController.update);
supplierRouter.delete(
  '/:idSupplier',
  ensureAuthenticate,
  supplierController.delete,
);
supplierRouter.get(
  '/:idSupplier',
  ensureAuthenticate,
  supplierController.listOne,
);

export default supplierRouter;
