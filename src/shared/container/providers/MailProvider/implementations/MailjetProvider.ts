import IMailProvider from '../models/IMailProvider';
import mailjet, { ConnectOptions } from 'node-mailjet';
import ISendMailDTO from '../dtos/ISendMailDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private sender: mailjet.Email.Client;

  constructor() {
    this.sender = mailjet.connect(
      process.env.MAIL_APIKEY_PUBLIC || '',
      process.env.MAIL_APIKEY_PRIVATE || '',
    );
  }

  public async sendMail({
    to,
    from,
    subject,
    Variables,
  }: ISendMailDTO): Promise<void> {
    const messages = [
      {
        From: {
          Email: from?.email,
          Name: from?.name,
        },
        To: [
          {
            Email: to.email,
            Name: to.name,
          },
        ],
        Subject: subject,
        TemplateID: 3067554,
        TemplateLanguage: true,
        Variables: Variables,
      },
    ];

    try {
      await this.sender.post('send', { version: 'v3.1' }).request({
        Messages: messages,
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }
}
