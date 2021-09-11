import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISupplierRepository from '../repositories/ISupplierRepository';

interface IRequest {
  name: string;
  cnpj: string;
}

@injectable()
export default class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private supplierRepository: ISupplierRepository,
  ) {}

  public async execute({ cnpj, name }: IRequest): Promise<Supplier> {
    const sameCNPJ = await this.supplierRepository.findByCnpj(cnpj);

    if (sameCNPJ) {
      throw new AppError('Ja existe um fornecedor com este CNPJ');
    }

    const supplier = await this.supplierRepository.create({
      cnpj: cnpj,
      name: name,
    });

    return supplier;
  }
}
