import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Mailer from '@config/email/mailConfig';
import handlebars from 'handlebars';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import mailjet from 'node-mailjet';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest) {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Não existe usuário com este e-mail');
    }

    const tokenToReset = await jsonwebtoken.sign(
      {
        id: customer.id,
        email: customer.email,
      },
      'secret',
      { expiresIn: '1d' },
    );

    this.mailProvider.sendMail({
      subject: 'Alterar Senha',
      to: {
        email: 'thales.morais21@gmail.com',
        name: 'Thales Morais',
      },
      from: {
        email: 'contato@thalesmorais.dev',
        name: 'contato@thalesmorais.dev',
      },
      Variables: {
        linkreset: `https://fastcommerce.thalesmorais.dev/reset-password?token=${tokenToReset}`,
      },
    });

    // const mailer = await Mailer();
    // const pathTemplate = fs
    //   .readFileSync(
    //     path.join(
    //       __dirname,
    //       '..',
    //       '..',
    //       '..',
    //       'config',
    //       'email',
    //       'templates',
    //       'resetpassword.hbs',
    //     ),
    //   )
    //   .toString('utf-8');

    // const templateParse = handlebars.compile(pathTemplate);
    // const emailHTML = templateParse({
    //   username: customer.name,
    //   linkResetPassword: `https://fastcommerce.thalesmorais.dev/reset-password?token=${tokenToReset}`,
    // });

    // const sender = mailjet.connect(
    //   'a0d23373922398875c4288f6a02375a3',
    //   '10a036b25a4bf2082d387bdf49090d0d',
    // );

    return {
      emailLink: 'ok', // remover posteriormente
    };
  }
}

export default CreateUserService;
