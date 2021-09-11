import Supplier from './../infra/typeorm/entities/Supplier';
import SupplierDTO from './../dtos/SupplierDTO';

export default interface ISupplierRepository {
  create(supplier: SupplierDTO): Promise<Supplier>;
  delete(supplier: Supplier): Promise<void>;
  findById(id: string): Promise<Supplier | undefined>;
  findAll(): Promise<Supplier[]>;
  findByName(name: string): Promise<Supplier[]>;
  findByCnpj(cnpj: string): Promise<Supplier | undefined>;
  saveSupplier(supplier: Supplier): Promise<Supplier>;
}
