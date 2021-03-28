import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProductService from '../../../services/ListPublicProducts';
import ListTrendingItems from '../../../services/ListTrendingItems';
import ListPublicOneProduct from '../../../services/ListPublicOneProduct';


export default class ProductController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.status(200).json(products);
  }

  public async indexTrends(request: Request, response: Response): Promise<Response> {
    const listProductsTrending =  container.resolve(ListTrendingItems);

    const itemTrendings = await listProductsTrending.execute();

    return response.status(200).json(itemTrendings);

  }


  public async indexOne(request: Request, response: Response): Promise<Response> {
      const listProduct =  container.resolve(ListPublicOneProduct);

      const {idProduct} = request.params;
    const product = await listProduct.execute(idProduct);

    return response.status(200).json(product);

  }


  
}
