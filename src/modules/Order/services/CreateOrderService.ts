import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from './../repositories/IOrderRepositorie';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import IProductRepository from '@modules/Product/repositories/IProductRepository';
import CreateShipmentService from '@modules/Shipment/services/CreateShipmentService';
import { container } from 'tsyringe';

interface Product {
  productId: string;
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

    const productsIds = products.map(prd => {
      return prd.productId;
    });

    if (!customer) {
      throw new AppError('Usuário não informado !');
    }

    const orderCreated = await this.ordersRepository.create({
      cep,
      city,
      customer,
      district,
      numberHouse,
      street,
      uf,
      statusCode: '1',
      products: products,
    });

    if (!orderCreated) {
      throw new AppError(
        'Ocorreu um erro ao gerar o pedido, por favor tente novamente',
      );
    }

    return orderCreated;
  }
}

export default CreateOrderService;
