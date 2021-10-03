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

    if (sameCNPJ && sameCNPJ.cnpj !== '') {
      throw new AppError('CNPJ ja existe, por favor informe outro !');
    }

    const supplier = await this.supplierRepository.create({
      cnpj: cnpj,
      name: name,
    });

    return supplier;
  }
}
