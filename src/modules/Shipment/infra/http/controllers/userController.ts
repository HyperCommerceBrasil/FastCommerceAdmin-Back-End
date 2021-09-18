import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateShipmentService';
import ListAllUsers from '../../../services/ListAllUsersService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const { name, email, password } = request.body;

    const user = await createUser.execute({
      email,
      name,
      password,
    });

    return response.status(201).json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsers);

    const users = await listAllUsers.execute();

    return response.status(201).json(users);
  }
}
