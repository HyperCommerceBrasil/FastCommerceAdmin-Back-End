import { Router } from 'express';

import CollectionController from '../controllers/CollectionsController';

const collectionController = new CollectionController();
const collectionRouter = Router();

collectionRouter.post('/', collectionController.create);
collectionRouter.get('/', collectionController.index);
collectionRouter.delete('/:idCollection', collectionController.delete);
collectionRouter.get('/search', collectionController.search);

export default collectionRouter;
