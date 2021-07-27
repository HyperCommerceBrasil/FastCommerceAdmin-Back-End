import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailJet from './implementations/MailjetProvider';
import { container } from 'tsyringe';

export default {
  ethereal: container.resolve(EtherealMailProvider),
  mailjet: container.resolve(MailJet),
};
