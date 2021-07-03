import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';
import jwt from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ email, password }: IRequest) {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('E-mail ou Senha inválido');
    }

    const authenticate = await bcrypt.compare(password, customer.password);

    if (!authenticate) {
      throw new AppError('Usuário ou senha inválido');
    }

    const token = await jwt.sign(
      {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
      process.env.PRIVATE_KEY_CUSTOMER || '',
    );

    return {
      user: {
        email: customer.email,
        name: customer.name,
        id: customer.id,
      },
      token,
    };
  }
}

export default CreateUserService;
