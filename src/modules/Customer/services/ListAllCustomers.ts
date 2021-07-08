import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(page: number) {
    console.log(page);
    const customers = await this.customersRepository.findAllCustomers(page);

    return customers;
  }
}

export default ListAllCustomersService;
