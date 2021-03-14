import IUserDTO from "../dtos/IUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {

    create(data: IUserDTO): Promise<User>;
    findByName(name: string ): Promise<User | undefined>;
    findByEmail(email: string ): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findAllUsers(): Promise<User[]>;
}