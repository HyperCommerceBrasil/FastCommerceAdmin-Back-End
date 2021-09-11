import SupplierDTO from '@modules/Supplier/dtos/SupplierDTO';
import { getRepository, Like, Repository } from 'typeorm';
import ISupplierRepository from '../../../repositories/ISupplierRepository';

import Supplier from '../entities/Supplier';

class SupplierRepository implements ISupplierRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async create(data: SupplierDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create(data);
    await this.ormRepository.save(supplier);
    return supplier;
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne(id);

    return supplier;
  }

  public async findAll(): Promise<Supplier[]> {
    const suppliers = await this.ormRepository.find();

    return suppliers;
  }

  public async delete(supplier: Supplier): Promise<void> {
    await this.ormRepository.delete(supplier.id);
  }

  public async findByName(name: string): Promise<Supplier[]> {
    const result = await this.ormRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });

    return result;
  }

  public async findByCnpj(cnpj: string): Promise<Supplier | undefined> {
    const supplier = await this.ormRepository.findOne({
      where: {
        cnpj,
      },
    });

    return supplier;
  }

  public async saveSupplier(supplier: Supplier): Promise<Supplier> {
    const supplierSaved = await this.ormRepository.save(supplier);

    return supplierSaved;
  }
}

export default SupplierRepository;
