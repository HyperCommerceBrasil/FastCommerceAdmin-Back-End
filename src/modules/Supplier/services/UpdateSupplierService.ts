import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISupplierRepository from '../repositories/ISupplierRepository';

interface IRequest {
  idSupplier: string;
  name: string;
  cnpj: string;
}

@injectable()
export default class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({
    idSupplier,
    name,
    cnpj,
  }: IRequest): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(idSupplier);

    if (!supplier) {
      throw new AppError('Supplier não encontrado');
    }

    supplier.name = name;
    supplier.cnpj = cnpj;

    await this.supplierRepository.saveSupplier(supplier);

    return supplier;
  }
}
