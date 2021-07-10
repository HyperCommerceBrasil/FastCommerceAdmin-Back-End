import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthCustomerService from '../../../services/AuthenticateCustomerService';
import GenerateLinkRecoverPasswordService from '../../../services/GenerateLinkRecoverPasswordService';

import ChangePasswordService from '../../../services/ChangePasswordService';

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

  public async generateResetLinkPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const generateLink = container.resolve(GenerateLinkRecoverPasswordService);
    const { email } = request.body;

    const resetInfo = await generateLink.execute({
      email,
    });

    return response.status(200).json(resetInfo);
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log('Worked');
    const changePassword = await container.resolve(ChangePasswordService);
    let token = request.query.token || '';
    const { password } = request.body;

    console.log('Worked');

    const resetInfo = await changePassword.execute({
      token: String(token),
      password,
    });

    return response.status(200).json(resetInfo);
  }
}
