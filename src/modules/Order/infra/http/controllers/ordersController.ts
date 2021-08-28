import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ListOneOrderService from '../../../services/ListOneOrderService';

export default class AddressAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);
    const { cep, city, street, uf, district, numberHouse } = request.body;

    const customerId = request.customer.id;

    const order = await createOrder.execute({
      cep,
      city,
      numberHouse,
      customerId: customerId,
      district,
      street,
      uf,
    });

    return response.status(201).json(order);
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const listOrder = container.resolve(ListOneOrderService);
    const { orderId } = request.params;

    const customerId = request.customer.id;

    const order = await listOrder.execute({
      orderId,
    });

    return response.status(201).json(order);
  }
}
