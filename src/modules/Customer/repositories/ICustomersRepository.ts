import IUserDTO from '../dtos/ICustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
  create(data: IUserDTO): Promise<Customer>;
  findByName(name: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findByCpf(cpf: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  findAllCustomers(page: number): Promise<[Customer[], number]>;
  saveCustomer(customer: Customer): Promise<void>;
}
