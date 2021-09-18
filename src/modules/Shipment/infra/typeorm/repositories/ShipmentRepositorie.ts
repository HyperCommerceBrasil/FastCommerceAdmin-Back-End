import ShipmentDTO from '@modules/Shipment/dtos/ShipmentDTO';
import IShipmentRepository from '@modules/Shipment/repositories/IShipmentRepository';
import { getRepository, Repository } from 'typeorm';
import Shipment from '../entities/Shipment';

class ShipmentRepositoie implements IShipmentRepository {
  private ormRepository: Repository<Shipment>;

  constructor() {
    this.ormRepository = getRepository(Shipment);
  }

  public async create(data: ShipmentDTO): Promise<Shipment> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }
}

export default ShipmentRepositoie;
