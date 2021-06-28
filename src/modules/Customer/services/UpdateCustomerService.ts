import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthdate: Date;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id, name, email, cpf, birthdate }: IRequest) {
    if (!id) {
      throw new AppError('O usuário não está logado');
    }
    const customer = await this.customersRepository.findById(id || '');
    const sameEmail = await this.customersRepository.findByEmail(email);
    const sameCpf = await this.customersRepository.findByCpf(cpf);

    if (sameEmail && sameEmail.id !== id) {
      throw new AppError('Ja existe um usuário com este e-mail');
    }

    if (sameCpf && sameCpf.id !== id) {
      throw new AppError('Ja existe um usuário com este cpf');
    }

    if (!customer) {
      throw new AppError('Usuário não encontrado :(');
    }

    customer.name = name;
    customer.cpf = cpf;
    customer.birthdate = birthdate;
    customer.email = email;

    await this.customersRepository.saveCustomer(customer);

    return customer;
  }
}

export default UpdateCustomerService;
