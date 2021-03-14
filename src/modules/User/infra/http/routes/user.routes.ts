import { Router } from 'express';

 import UserController from '../controllers/userController';

 const userController = new UserController();
 const userRouter = Router();

 userRouter.post('/', userController.create);
 userRouter.get('/', userController.index);
// userRouter.delete('/:idCollection', userController.delete);
// userRouter.put('/', userController.update);

export default userRouter;
