import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/ICustomersRepository';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Mailer from '@config/email/mailConfig';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

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

    @inject('MailProvider')
    private mailProvider: IMailProvider,
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

    this.mailProvider.sendMail({
      subject: 'Bem vindo',
      to: {
        email: customer.email,
        name: customer.name,
      },
      from: {
        email: 'contato@thalesmorais.dev',
        name: 'contato@thalesmorais.dev',
      },
      template: 3067619,
      Variables: {
        username: customer.name,
      },
    });
    return customer;
  }
}

export default CreateUserService;
