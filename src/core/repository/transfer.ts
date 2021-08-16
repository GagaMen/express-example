import { Transfer, TransferDTO } from './../model/transfer';

export interface ITransferRepository {
    findById(id: string): Promise<Transfer>;
    create(tranfer: TransferDTO): Promise<Transfer>;
    delete(tranfer: Transfer): Promise<void>;
    update(tranfer: Transfer): Promise<void>;
}
