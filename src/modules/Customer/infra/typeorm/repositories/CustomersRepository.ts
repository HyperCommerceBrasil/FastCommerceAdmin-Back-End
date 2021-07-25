import ICustomerDTO from '@modules/Customer/dtos/ICustomerDTO';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create(data: ICustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(data);

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findByCpf(cpf: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id: id,
      },
      relations: ['adresses'],
    });

    return customer;
  }

  public async findAllCustomers(page: number): Promise<[Customer[], number]> {
    const skipIndex = (page - 1) * 8;

    console.log(skipIndex);
    const customer = await this.ormRepository.findAndCount({
      skip: skipIndex < 0 ? 0 : skipIndex,
      take: 8,
    });

    return customer;
  }

  public async saveCustomer(customer: Customer): Promise<void> {
    await this.ormRepository.save(customer);
  }
}

export default CustomersRepository;
