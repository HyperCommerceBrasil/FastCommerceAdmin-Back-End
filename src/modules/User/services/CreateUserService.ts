import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import bcrypt from 'bcryptjs';


interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}


    public async execute({name, email, password}: IRequest) {

        const userSameName = await this.usersRepository.findByName(name);
        const userSameEmail = await this.usersRepository.findByName(email);


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("password", salt);

        if(userSameName) {
            throw new AppError("Ja existe um usuário com este NOME :(");
        }

        if(userSameEmail) {
            throw new AppError("Ja existe um usuário com este EMAIL :(");
        }


        const user = await this.usersRepository.create({
            email,
            name,
            password: hash
        });

        return user;
    }

}


export default CreateUserService;