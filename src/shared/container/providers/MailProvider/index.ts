import EtherealMailProvider from './implementations/EtherealMailProvider';

import { container } from 'tsyringe';

export default {
  ethereal: container.resolve(EtherealMailProvider),
  //   ses: container.resolve(SESMailProvider),
};
