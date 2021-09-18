import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IShipmentRepository from '../repositories/IShipmentRepository';

import IOrdersRepository from '@modules/Order/repositories/IOrderRepositorie';

interface IRequest {
  orderId: string;
}

interface Supplier {
  id: string;
  name: string;
  items: string[];
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
class CreateUserService {
  constructor(
    @inject('ShipmentRepository')
    private shipmentRepository: IShipmentRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ orderId }: IRequest) {
    const order = await this.ordersRepository.findOne(orderId);
    const order2 = await this.ordersRepository.findOne(orderId);

    const orderItemsBySupplier = await this.ordersRepository.findItemsWithSupplier(
      orderId,
    );

    if (!orderItemsBySupplier) {
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
        } else {
        }
      }

      return;
    });

    // Separa os itens Dropshipping
    const dropshippingItems = order2?.items.filter(prod => {
      return prod.typeStorage === 'Dropshipping';
    });

    // Cria os splits
    suppliersOrder.map(supplierOrder => {
      console.log(supplierOrder.name);
      dropshippingItems?.forEach(prod => {
        if (prod.supplierId === supplierOrder.id) {
          supplierOrder.items.push(prod.id);
        }
      });
    });

    return suppliersOrder;
  }
}

export default CreateUserService;
