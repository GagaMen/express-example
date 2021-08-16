export class User {
    constructor(public id: number, public username: string, public password: string) {}
}

export type UserDTO = Pick<User, 'username' | 'password'>;
