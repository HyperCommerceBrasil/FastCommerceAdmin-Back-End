import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthdate: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email, password, cpf, birthdate }: IRequest) {
    const customerSameEmail = await this.customersRepository.findByEmail(email);

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    if (customerSameEmail) {
      throw new AppError('Ja existe um usuário com este EMAIL :(');
    }

    const customer = await this.customersRepository.create({
      email,
      name,
      password: hash,
      birthdate,
      cpf,
    });

    return customer;
  }
}

export default CreateUserService;
