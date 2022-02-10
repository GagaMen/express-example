import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class User {
    @IsMongoId()
    @IsNotEmpty()
    public id: string;

    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

export type UserDTO = Pick<User, 'username' | 'password'>;
