import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import IBlacklistRepositorie from '@shared/repositories/IBlacklistRepositorie';
import Mailer from '@config/email/mailConfig';
import handlebars from 'handlebars';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface IRequest {
  token?: string;
  password: string;
}

@injectable()
class ChangePasswordService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('BlacklistRepository')
    private blacklistRepository: IBlacklistRepositorie,
  ) {}

  public async execute({ token, password }: IRequest) {
    let decoded = {} as { email: string; id: string };

    if (!token) {
      throw new AppError('Token não informado');
    }

    const tokenInvalid = await this.blacklistRepository.findByType(
      token,
      'reset_password',
    );

    if (tokenInvalid) {
      throw new AppError('Este token ja foi usado');
    }

    try {
      decoded = (await jsonwebtoken.verify(token || '', 'secret')) as {
        email: string;
        id: string;
      };
    } catch {
      throw new AppError('Token expirado ou inválido');
    }

    const customer = await this.customersRepository.findByEmail(decoded.email);

    if (!customer) {
      throw new AppError('Email não existe ou link expirado');
    }

    const sameOldPass = await bcrypt.compare(password, customer.password);

    if (sameOldPass) {
      throw new AppError('A nova senha precisá ser diferente da antiga');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    customer.password = hash;

    await this.customersRepository.saveCustomer(customer);

    const blacklist = await this.blacklistRepository.create({
      token: token,
      type: 'reset_password',
    });

    return decoded;
  }
}

export default ChangePasswordService;
