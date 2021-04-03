import { Router } from 'express';

import CollectionController from '../controllers/CollectionsController';
import ensureAuthenticate from '@modules/User/infra/http/middlewares/ensureAuthenticated';

const collectionController = new CollectionController();
const collectionRouter = Router();

collectionRouter.post('/', ensureAuthenticate, collectionController.create);
collectionRouter.get('/', collectionController.index);
collectionRouter.delete('/:idCollection', ensureAuthenticate, collectionController.delete);
collectionRouter.get('/search', ensureAuthenticate, collectionController.search);

export default collectionRouter;
