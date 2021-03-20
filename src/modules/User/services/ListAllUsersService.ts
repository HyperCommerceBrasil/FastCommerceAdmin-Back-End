import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";



@injectable()
class ListAllUsersService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}


    public async execute() {

        const users = await this.usersRepository.findAllUsers();
        return users;

        
        



    }

}



export default ListAllUsersService;