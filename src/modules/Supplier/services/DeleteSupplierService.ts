import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISupplierRepository from '../repositories/ISupplierRepository';

@injectable()
export default class DeleteSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new AppError('Fornecedor não encontrado');
    }

    await this.supplierRepository.delete(supplier);

    return supplier;
  }
}
