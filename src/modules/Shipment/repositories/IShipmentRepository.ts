import ShipmentDTO from '../dtos/ShipmentDTO';
import Shipment from '../infra/typeorm/entities/Shipment';

export default interface IUsersRepository {
  create(data: ShipmentDTO): Promise<Shipment>;
}
