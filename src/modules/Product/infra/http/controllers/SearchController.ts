import { Response, Request } from 'express';
import { container } from 'tsyringe';

import SearchProductPrivateService from '../../../services/SearchProductPrivateService';

export default class ProductController {
  public async search(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(SearchProductPrivateService);

    const { search } = await request.query;

    const products = await listProducts.execute({
      search: String(search),
    });

    return response.status(200).json(products);
  }
}
