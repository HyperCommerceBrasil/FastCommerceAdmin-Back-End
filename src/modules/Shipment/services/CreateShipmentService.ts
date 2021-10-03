import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IShipmentRepository from '../repositories/IShipmentRepository';

import IOrdersRepository from '@modules/Order/repositories/IOrderRepositorie';

interface IRequest {
  orderId: string;
}

interface ItemShipping {
  productId: string;
  orderItemId: string;
}

interface Supplier {
  id: string;
  name: string;
  items: ItemShipping[];
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  value: number;
  quantity: number;
  supplierid: string;
  suppliername: string;
}

@injectable()
class CreateShipmentService {
  constructor(
    @inject('ShipmentRepository')
    private shipmentRepository: IShipmentRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ orderId }: IRequest) {
    const order = await this.ordersRepository.findOne(orderId);
    const orderItems = await this.ordersRepository.findItems(orderId);

    console.log('Order Items');
    console.log(orderItems.length);

    const orderWithItems = await this.ordersRepository.findOrderWithItems(
      orderId,
    );

    console.log(orderWithItems?.items.length);

    const orderItemsBySupplier = await this.ordersRepository.findItemsWithSupplier(
      orderId,
    );

    if (!order) {
      throw new AppError('Pedido não existe');
    }

    function existInArraySupplier(
      supplierId: string,
      supplierArray: Supplier[],
    ) {
      const supplier = supplierArray.filter(item => {
        return supplierId === item.id;
      });

      return supplier.length > 0;
    }

    // Pega os suppliers do pedido
    let suppliersOrder: Supplier[] = [];
    orderItemsBySupplier.map(product => {
      if (suppliersOrder) {
        if (!existInArraySupplier(product.supplierid, suppliersOrder)) {
          suppliersOrder.push({
            id: product.supplierid,
            name: product.suppliername,
            items: [],
          });
        }
      }

      return;
    });

    // Separa os itens Dropshipping
    const dropshippingItems = orderItems.filter(ordItem => {
      return ordItem.product.typeStorage === 'Dropshipping';
    });

    // console.log('items dropshipping qtd');
    // console.log(dropshippingItems.length);

    // console.log('Suppliers');
    // console.log(suppliersOrder);

    // Cria os splits
    suppliersOrder.map(supplierOrder => {
      dropshippingItems?.map(ordItem => {
        if (ordItem.product.supplierId === supplierOrder.id) {
          supplierOrder.items.push({
            productId: ordItem.productId,
            orderItemId: ordItem.id,
          });
        }
      });
    });

    suppliersOrder.map(async supplierMapped => {
      let itemsShipping = supplierMapped.items.map(itemSupplier => {
        return itemSupplier;
      });

      console.log(supplierMapped.name);
      console.log(itemsShipping);

      await this.shipmentRepository.create({
        orderId: order?.id,
        items: itemsShipping,
        shipmentNumber:
          order?.numberOrder +
          '-' +
          Math.round(Math.random() * Number(order?.numberOrder)),
      });
    });

    console.log('---Fim---');

    const orderCreated = await this.ordersRepository.findOne(orderId);

    return orderCreated;
  }
}

export default CreateShipmentService;
