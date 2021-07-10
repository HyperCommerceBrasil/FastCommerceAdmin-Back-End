import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string) {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer informado não encontrado :(');
    }
    return customer;
  }
}

export default ListAllCustomersService;
