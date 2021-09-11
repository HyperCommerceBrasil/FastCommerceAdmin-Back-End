import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISupplierRepository from '../repositories/ISupplierRepository';

interface IRequest {
  idSupplier: string;
}

@injectable()
export default class ListOneSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({ idSupplier }: IRequest): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(idSupplier);

    if (!supplier) {
      throw new AppError('Supplier não encontrado');
    }

    return supplier;
  }
}
