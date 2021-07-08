import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Mailer from '@config/email/mailConfig';
import handlebars from 'handlebars';
import fs from 'fs';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthdate: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email, password, cpf, birthdate }: IRequest) {
    const customerSameEmail = await this.customersRepository.findByEmail(email);
    const customerSameCpf = await this.customersRepository.findByCpf(cpf);

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    if (customerSameEmail) {
      throw new AppError('Ja existe um usuário com este EMAIL :(');
    }

    if (customerSameCpf) {
      throw new AppError('Ja existe um usuário com este CPF :(');
    }
    const customer = await this.customersRepository.create({
      email,
      name,
      password: hash,
      birthdate,
      cpf,
    });

    const pathTemplate = fs
      .readFileSync(
        '/home/thalesmorais/develop/fastcommerce/FastCommerceAdmin-Back-End/src/config/email/templates/welcomeuser.hbs',
      )
      .toString('utf-8');

    const templateParse = handlebars.compile(pathTemplate);
    const emailHTML = templateParse({
      username: customer.name,
    });

    const mailer = await Mailer();
    const infoMail = await mailer.sendMail({
      to: customer.email,
      from: process.env.EMAIL_USER || 'equipe@fastcommerce.com.br',
      subject: `Bem Vindo ${customer.name}`,
      html: emailHTML,
    });

    if (!infoMail.messageId) {
      throw Error('Não foi possivel completar o cadastro');
    }
    console.log('Message sent: %s', infoMail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(infoMail));

    return customer;
  }
}

export default CreateUserService;
