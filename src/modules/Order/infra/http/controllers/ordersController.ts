import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ListOneOrderService from '../../../services/ListOneOrderService';
import ListAllOrdersPaginate from '../../../services/ListAllOrdersPaginate';

import CreateShipmentService from '@modules/Shipment/services/CreateShipmentService';

export default class AddressAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);
    const createShipments = container.resolve(CreateShipmentService);

    const {
      cep,
      city,
      street,
      uf,
      district,
      numberHouse,
      products,
    } = request.body;

    const customerId = request.customer.id;

    const order = await createOrder.execute({
      cep,
      city,
      numberHouse,
      customerId: customerId,
      district,
      street,
      uf,
      products,
    });

    const shipmentOrder = await createShipments.execute({
      orderId: order.id,
    });

    return response.status(201).json(shipmentOrder);
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const listOrder = container.resolve(ListOneOrderService);
    const { orderId } = request.params;

    const order = await listOrder.execute({
      orderId,
    });

    return response.status(201).json(order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrder = container.resolve(ListAllOrdersPaginate);
    const { page } = request.query;

    const order = await listOrder.execute(Number(page));

    return response.status(200).json(order);
  }
}
