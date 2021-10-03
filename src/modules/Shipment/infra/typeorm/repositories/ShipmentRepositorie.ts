import ShipmentDTO from '@modules/Shipment/dtos/ShipmentDTO';
import IShipmentRepository from '@modules/Shipment/repositories/IShipmentRepository';
import { getRepository, Repository } from 'typeorm';
import Shipment from '../entities/Shipment';
import ShipmentItem from '../entities/ShipmentItem';

class ShipmentRepositoie implements IShipmentRepository {
  private ormRepository: Repository<Shipment>;
  private ormRepositoryItem: Repository<ShipmentItem>;

  constructor() {
    this.ormRepository = getRepository(Shipment);
    this.ormRepositoryItem = getRepository(ShipmentItem);
  }

  public async create(data: ShipmentDTO): Promise<Shipment> {
    const shipment = this.ormRepository.create({
      orderId: data.orderId,
      shipmentNumber: data.shipmentNumber,
    });

    await this.ormRepository.save(shipment, {
      transaction: true,
    });

    data.items.map(async item => {
      const shippimentItem = this.ormRepositoryItem.create({
        orderId: data.orderId,
        productId: item.productId,
        orderItemId: item.orderItemId,
        shipmentId: shipment.id,
      });

      await this.ormRepositoryItem.save(shippimentItem);
    });

    return shipment;
  }
}

export default ShipmentRepositoie;
