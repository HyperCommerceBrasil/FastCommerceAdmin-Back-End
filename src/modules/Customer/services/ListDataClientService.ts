import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListDataClientService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest) {
    const customer = await this.customersRepository.findById(id);

    return customer;
  }
}

export default ListDataClientService;
