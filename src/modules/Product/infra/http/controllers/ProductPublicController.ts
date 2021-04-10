import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProductService from '../../../services/ListPublicProducts';
import ListTrendingItems from '../../../services/ListTrendingItems';
import ListPublicOneProduct from '../../../services/ListPublicOneProduct';

import SearchProductService from '../../../services/SearchProductService';


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

   public async search(request: Request, response: Response): Promise<Response> {
      const searchProductService =  container.resolve(SearchProductService);

      const {product, collection} = request.query;

      const products = await searchProductService.execute({
        collection: String(collection),
        productName: String(product)
      })
     
      
      

    return response.status(200).json(products);

  }


  
}
