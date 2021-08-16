export class AccountType {
    constructor(public id: number, public name: string) {}
}

export type AccountTypeDTO = Pick<AccountType, 'name'>;
