import { LoggingService } from '../service/logging.service';
import { container } from 'tsyringe';
import { ConcreteAccountTypeRepository } from '../database/repository/account-type.repository';
import { ConcreteAccountRepository } from '../database/repository/account.repository';
import { ConcreteExpenseRepository } from '../database/repository/expense.repository';
import { ConcreteIncomeRepository } from '../database/repository/income.repository';
import { ConcreteTransactionCategoryRepository } from '../database/repository/transaction-category.repository';
import { ConcreteTransferRepository } from '../database/repository/transfer.repository';
import { ConcreteUserRepository } from '../database/repository/user.repository';

export default (): void => {
    container.register('Logger', { useClass: LoggingService });
    container.register('AccountTypeRepository', { useClass: ConcreteAccountTypeRepository });
    container.register('AccountRepository', { useClass: ConcreteAccountRepository });
    container.register('ExpenseRepository', { useClass: ConcreteExpenseRepository });
    container.register('IncomeRepository', { useClass: ConcreteIncomeRepository });
    container.register('TransactionCategoryRepository', {
        useClass: ConcreteTransactionCategoryRepository,
    });
    container.register('TransferRepository', { useClass: ConcreteTransferRepository });
    container.register('UserRepository', { useClass: ConcreteUserRepository });
};
