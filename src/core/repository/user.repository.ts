import { User, UserDTO } from '../model/user';

export interface UserRepository {
    findById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    create(user: UserDTO): Promise<User>;
    delete(user: User): Promise<void>;
    update(user: User): Promise<void>;
}
