import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth'


interface IRequest {
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}


    public async execute({ email, password}: IRequest) {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Este nome de usuário não existe !", 401)
        }


        const isCorrectPassword = await bcrypt.compare(password, user.password);
        console.log(isCorrectPassword);
        if(!isCorrectPassword) {
            throw new AppError("A senha informada está incorreta :(", 401)
        }


        const token = jwt.sign(user.id, authConfig.privateKey);


        return {token: token, user: user}







        
        


      





        return user;
    }

}


export default CreateUserService;