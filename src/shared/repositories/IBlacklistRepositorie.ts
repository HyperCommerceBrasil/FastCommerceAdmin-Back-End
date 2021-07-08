import BlacklistDTO from '@shared/dtos/BlacklistDTO';
import Blacklist from '../infra/typeorm/entities/Blacklist';

export default interface ICustomersRepository {
  create(data: BlacklistDTO): Promise<Blacklist>;
  findByType(token: string, type: string): Promise<Blacklist | undefined>;
}
