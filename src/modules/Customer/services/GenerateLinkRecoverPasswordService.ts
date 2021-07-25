import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Mailer from '@config/email/mailConfig';
import handlebars from 'handlebars';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
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

    console.log(__dirname);

    const mailer = await Mailer();
    const pathTemplate = fs
      .readFileSync(
        path.join(
          __dirname,
          '..',
          '..',
          '..',
          'config',
          'email',
          'templates',
          'resetpassword.hbs',
        ),
      )
      .toString('utf-8');

    const templateParse = handlebars.compile(pathTemplate);
    const emailHTML = templateParse({
      username: customer.name,
      linkResetPassword: `https://fastcommerce.thalesmorais.dev?token=${tokenToReset}`,
    });

    const infoMail = await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Resetar a Senha',
      html: emailHTML,
      encoding: 'utf-8',
    });

    console.log('Message sent: %s', infoMail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(infoMail));

    return { token: tokenToReset, email: customer.email };
  }
}

export default CreateUserService;
