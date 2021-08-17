import { LoggingService } from './../service/logging';
import { container } from 'tsyringe';
import { AccountTypeRepository } from './../database/repository/account-type';
import { AccountRepository } from './../database/repository/account';
import { ExpenseRepository } from './../database/repository/expense';
import { IncomeRepository } from './../database/repository/income';
import { TransactionCategoryRepository } from './../database/repository/transaction-category';
import { TransferRepository } from './../database/repository/transfer';
import { UserRepository } from './../database/repository/user';

export default (): void => {
    container.register('Logger', { useClass: LoggingService });
    container.register('AccountTypeRepository', { useClass: AccountTypeRepository });
    container.register('AccountRepository', { useClass: AccountRepository });
    container.register('ExpenseRepository', { useClass: ExpenseRepository });
    container.register('IncomeRepository', { useClass: IncomeRepository });
    container.register('TransactionCategoryRepository', {
        useClass: TransactionCategoryRepository,
    });
    container.register('TransferRepository', { useClass: TransferRepository });
    container.register('UserRepository', { useClass: UserRepository });
};
