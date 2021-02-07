import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateCollectionService from '../../../services/CreateCollectionService';
import ListCollectionsService from '../../../services/ListCollectionsService';
import DeleteCollectionService from '../../../services/DeleteCollectionService';

import ListCollectionByName from '../../../services/ListCollectionByName';

export default class CollectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCollection = container.resolve(CreateCollectionService);

    const { name } = request.body;

    const collection = await createCollection.execute(name);

    return response.status(201).json(collection);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCollections = container.resolve(ListCollectionsService);

    // const { name } = request.body;

    const collections = await listCollections.execute();

    return response.status(200).json(collections);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCollection = container.resolve(DeleteCollectionService);

    const { idCollection } = request.params;

    await deleteCollection.execute(idCollection);

    return response.json();
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const listCollectionByName = container.resolve(ListCollectionByName);

    const { search } = request.query;

    const collections = await listCollectionByName.execute(String(search));

    return response.json(collections);
  }
}
