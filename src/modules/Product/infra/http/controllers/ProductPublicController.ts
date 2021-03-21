import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProductService from '../../../services/ListPublicProducts';
import ListTrendingItems from '../../../services/ListTrendingItems';


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


  
}
