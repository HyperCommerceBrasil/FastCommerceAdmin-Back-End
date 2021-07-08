import IBlacklistRepository from './../../../repositories/IBlacklistRepositorie';
import { getRepository, Repository } from 'typeorm';
import Blacklist from '../entities/Blacklist';
import BlacklistDTO from '@shared/dtos/BlacklistDTO';

class BlacklistRepositorie implements IBlacklistRepository {
  private ormRepository: Repository<Blacklist>;

  constructor() {
    this.ormRepository = getRepository(Blacklist);
  }
  public async create(data: BlacklistDTO): Promise<Blacklist> {
    const blacklist = this.ormRepository.create({
      token: data.token,
      type: data.type,
    });

    await this.ormRepository.save(blacklist);

    return blacklist;
  }
  public async findByType(
    token: string,
    type: string,
  ): Promise<Blacklist | undefined> {
    const blacklist = await this.ormRepository.findOne({
      where: {
        token: token,
        type: type,
      },
    });

    return blacklist;
  }
}

export default BlacklistRepositorie;
