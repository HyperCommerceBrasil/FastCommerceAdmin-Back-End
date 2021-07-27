import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';

import jsonwebtoken from 'jsonwebtoken';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest) {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Não existe usuário com este e-mail');
    }

    const tokenToReset = await jsonwebtoken.sign(
      {
        id: customer.id,
        email: customer.email,
      },
      'secret',
      { expiresIn: '1d' },
    );

    this.mailProvider.sendMail({
      subject: 'Alterar Senha',
      to: {
        email: customer.email,
        name: customer.name,
      },
      from: {
        email: 'contato@thalesmorais.dev',
        name: 'contato@thalesmorais.dev',
      },
      template: 3067554,
      Variables: {
        linkreset: `https://fastcommerce.thalesmorais.dev/reset-password?token=${tokenToReset}`,
      },
    });
    return;
  }
}

export default CreateUserService;
