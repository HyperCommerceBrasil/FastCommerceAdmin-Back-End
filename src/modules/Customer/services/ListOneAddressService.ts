import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';

@injectable()
class ListOneAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(id: string) {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new AppError('Este endereço não existe');
    }

    return address;
  }
}

export default ListOneAddressService;
