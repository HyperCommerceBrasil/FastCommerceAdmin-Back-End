import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from './../repositories/IOrderRepositorie';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import IProductRepository from '@modules/Product/repositories/IProductRepository';

interface Product {
  id: string;
  value: number;
  quantity: number;
}

interface IRequest {
  street: string;
  district: string;
  uf: string;
  numberHouse: string;
  cep: string;
  city: string;
  customerId: string;
  products: Product[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    cep,
    city,
    district,
    numberHouse,
    street,
    uf,
    customerId,
    products,
  }: IRequest) {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Usuário não informado !');
    }

    const productsIds = products.map(prod => {
      return prod.id;
    });

    const productsFound = await this.productsRepository.findProductsByIds(
      productsIds,
    );

    const orderCreated = await this.ordersRepository.create({
      cep,
      city,
      customer,
      district,
      numberHouse,
      street,
      uf,
      statusCode: '1',
      products: productsFound,
    });

    const order = await this.ordersRepository.findOne(orderCreated.id);

    return order;
  }
}

export default CreateOrderService;
