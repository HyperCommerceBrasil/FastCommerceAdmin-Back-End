import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSupplierService from '../../../services/CreateSupplierService';
import ListAllSupplierService from '../../../services/ListAllSupplierService';
import DeleteSupplierService from '../../../services/DeleteSupplierService';

import ListOneSupplierService from '../../../services/ListOneSupplierService';

import UpdateSupplierService from '../../../services/UpdateSupplierService';

export default class CollectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSupplier = container.resolve(CreateSupplierService);

    const { name, cnpj } = request.body;

    const supplier = await createSupplier.execute({
      cnpj,
      name,
    });

    return response.status(201).json(supplier);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSupplier = container.resolve(ListAllSupplierService);

    const suppliers = await listSupplier.execute();

    return response.status(200).json(suppliers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteSupplier = container.resolve(DeleteSupplierService);

    const { idSupplier } = request.params;

    await deleteSupplier.execute(idSupplier);

    return response.json();
  }

  public async listOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listSupplier = container.resolve(ListOneSupplierService);

    const { idSupplier } = request.params;

    const supplier = await listSupplier.execute({
      idSupplier,
    });

    return response.status(200).json(supplier);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSupplier = container.resolve(UpdateSupplierService);

    const { idSupplier } = request.params;
    const { name, cnpj } = request.body;

    const supplier = await updateSupplier.execute({
      idSupplier,
      cnpj,
      name,
    });

    return response.status(200).json(supplier);
  }
}
