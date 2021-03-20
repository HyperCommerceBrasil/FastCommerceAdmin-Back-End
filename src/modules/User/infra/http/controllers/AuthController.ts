
import { Response, Request } from 'express';
import {container} from 'tsyringe';
import AuthUserService from '../../../services/AuthUserService';


export default class AuthController {
    public async login(request: Request, response: Response): Promise<Response> {
    const authUser = container.resolve(AuthUserService);
      const { email, password } = request.body;

      const responseAuth = await authUser.execute({email, password})
  
      return response.status(200).json(responseAuth);
    }


 
}