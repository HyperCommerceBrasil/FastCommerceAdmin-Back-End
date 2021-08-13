import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '../../../services/CreateProductService';
import ListProductService from '../../../services/ListProductService';
import ListOneProduct from '../../../services/ListOneProduct';
import DeleteProductService from '../../../services/DeleteProductService';
import UpdateProductService from '../../../services/UpdateProductService';

import CreateProductImageService from '../../../services/CreateProductImageService';


import DeleteProductImageService from '../../../services/DeleteProductImageService';



export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProduct = container.resolve(CreateProductService);

    const {
      name,
      quantity,
      price,
      collectionId,
      ean,
      description,
      details,
      price_promotional,
      is_active,
      trending,
      isFreeShipping
    } = request.body;

    const product = await createProduct.execute({
      collectionId,
      name,
      price,
      quantity,
      description,
      details,
      ean,
      price_promotional,
      trending,
     
      is_active,
      isFreeShipping,
    });

    return response.status(201).json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.status(200).json(products);
  }

  public async indexOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listOneProduct = container.resolve(ListOneProduct);

    const { id } = request.params;

    const product = await listOneProduct.execute(id);

    return response.status(200).json(product);
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
    const {
      name,
      price,
      quantity,
      collectionId,
      trending,
      details,
      is_active,
      ean,
      price_promotional,
      isFreeShipping
    } = request.body;

    const product = await updateProduct.execute({
      collectionId,
      id,
      name,
      price,
      quantity,
      details,
      ean,
      is_active,
      trending,
      price_promotional,
      isFreeShipping
    });

    return response.status(200).json(product);
  }

  public async upload(request: Request, response: Response): Promise<Response> {
    const updateImageProduct = container.resolve(CreateProductImageService);

    const {
      location: url = '',
      filename,
      key,
    } = request.file as Express.MulterS3.File;

    const urlLocal = process.env.API_URL + '/files/' + request.file.filename;

    const { productId } = request.body;

    const productImage = await updateImageProduct.execute({
      image: process.env.STORAGE_TYPE === 's3' ? url : urlLocal,
      product: productId,
      key: filename || key,
    });

    return response.json({
      message: 'ok',
      url: request.file.filename,
      productImage: productImage,
    });
  }


  public async deleteImage(request: Request, response: Response): Promise<Response> {
    const deleteImageProduct = container.resolve(DeleteProductImageService);

    const { imageId } = request.params;

     await deleteImageProduct.execute({imageId});

    return response.status(200).json({});
  }
}
