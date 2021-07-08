import { NextFunction, Response, Request } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getRepository } from 'typeorm';
import Blacklist from '@shared/infra/typeorm/entities/Blacklist';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  id: string;
}
export default async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Cliente não autenticado', 401);
    }

    const [, token] = authHeader.split(' ');

    const decoded = await verify(token, process.env.PRIVATE_KEY_CUSTOMER || '');

    const repository = await getRepository(Blacklist);

    const tokenInvalid = await repository.findOne({
      where: {
        token: token,
        type: 'login_token',
      },
    });

    if (tokenInvalid) {
      throw new AppError('Cliente não autenticado');
    }

    const { id } = decoded as ITokenPayload;

    request.customer = {
      id: id,
    };

    return next();
  } catch (err) {
    throw new AppError('Cliente não autenticado', 401);
  }
}
