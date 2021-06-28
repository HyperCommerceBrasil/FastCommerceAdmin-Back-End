import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthCustomerService from '../../../services/AuthenticateCustomerService';

export default class AuthCustomerController {
  public async login(request: Request, response: Response): Promise<Response> {
    const authCustomer = container.resolve(AuthCustomerService);
    const { email, password } = request.body;

    const token = await authCustomer.execute({
      email,
      password,
    });

    return response.status(201).json(token);
  }
}
