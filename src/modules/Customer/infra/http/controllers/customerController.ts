import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);
    const { name, email, password, cpf, birthdate } = request.body;

    const customer = await createCustomer.execute({
      email,
      name,
      password,
      birthdate,
      cpf,
    });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = container.resolve(UpdateCustomerService);

    const id = request.headers.customerid;
    const { name, email, cpf, birthdate } = request.body;

    const customer = await updateCustomer.execute({
      id: String(id),
      email,
      name,
      birthdate,
      cpf,
    });

    return response.status(201).json(customer);
  }
}