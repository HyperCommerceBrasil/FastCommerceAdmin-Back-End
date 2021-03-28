import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '../../../services/CreateProductService';
import ListProductService from '../../../services/ListProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProduct = container.resolve(CreateProductService);

    const { name, quantity, price, collectionId, ean, description, details, price_promotional } = request.body;

    const product = await createProduct.execute({
      collectionId,
      name,
      price,
      quantity,
      description,
      details,
      ean,
      price_promotional
    });

    return response.status(201).json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.status(200).json(products);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProduct = container.resolve(DeleteProductService);

    const { id } = request.params;

    await deleteProduct.execute(id);

    return response.status(200).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProduct = container.resolve(UpdateProductService);

    const { id } = request.params;
    const { name, price, quantity, collectionId } = request.body;

    const product = await updateProduct.execute({
      collectionId,
      id,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }
}
