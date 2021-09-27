import { UserRepository } from '../../core/repository/user.repository';
import { inject, injectable } from 'tsyringe';
import { User, UserDTO } from '../../core/model/user';
import * as argon2 from 'argon2';
import { Service } from '../common/service';

@injectable()
export class UserService implements Service<User> {
    constructor(@inject('UserRepository') private userRepository: UserRepository) {}

    async list(limit = 100, page = 1): Promise<User[]> {
        return await this.userRepository.find(limit, page);
    }

    async readByID(userId: string): Promise<User> {
        return await this.userRepository.findById(userId);
    }

    async create(user: UserDTO): Promise<User> {
        user.password = await argon2.hash(user.password);

        return await this.userRepository.create(user);
    }

    async update(userId: string, userDelta: UserDTO): Promise<User> {
        const user: User = await this.userRepository.findById(userId);

        if (userDelta.username !== undefined) {
            user.username = userDelta.username;
        }

        if (userDelta.password !== undefined) {
            user.password = await argon2.hash(userDelta.password);
        }

        await this.userRepository.update(user);

        return user;
    }

    async delete(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);

        return await this.userRepository.delete(user);
    }
}
