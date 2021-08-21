import { userSchema } from '../schema/user.schema';
import { User, UserDTO } from '../../core/model/user';
import { DatabaseService } from '../database.service';
import { UserRepository } from '../../core/repository/user.repository';
import { Model } from 'mongoose';
import { injectable } from 'tsyringe';

@injectable()
export class ConcreteUserRepository implements UserRepository {
    private userModel: Model<User>;

    constructor(databaseService: DatabaseService) {
        this.userModel = databaseService.connection.model<User>('User', userSchema);
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);

        if (user === null) {
            throw new Error(`User not found by using '${id}' as id`);
        }

        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find({});
    }

    async create(user: UserDTO): Promise<User> {
        return await this.userModel.create(user);
    }

    async delete(user: User): Promise<void> {
        await this.userModel.findByIdAndDelete(user.id);
    }

    async update(user: User): Promise<void> {
        await this.userModel.findByIdAndUpdate(user.id, {
            username: user.username,
            password: user.password,
        });
    }
}
