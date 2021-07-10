import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute() {
    const customers = await this.customersRepository.findAllCustomers();

    return customers;
  }
}

export default ListAllCustomersService;
