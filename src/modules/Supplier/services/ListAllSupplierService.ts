import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISupplierRepository from '../repositories/ISupplierRepository';

@injectable()
export default class ListAllSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute(): Promise<Supplier[]> {
    const suppliers = await this.supplierRepository.findAll();

    return suppliers;
  }
}
