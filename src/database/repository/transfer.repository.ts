import { transferSchema } from '../schema/transfer.schema';
import { DatabaseService } from '../database.service';
import { Transfer, TransferDTO } from '../../core/model/transfer';
import { Model } from 'mongoose';
import { TransferRepository } from '../../core/repository/transfer.repository';
import { injectable } from 'tsyringe';

@injectable()
export class ConcreteTransferRepository implements TransferRepository {
    private transferModel: Model<Transfer>;

    constructor(databaseService: DatabaseService) {
        this.transferModel = databaseService.connection.model<Transfer>('Transfer', transferSchema);
    }

    async findById(id: string): Promise<Transfer> {
        const transfer = await this.transferModel.findById(id);

        if (transfer === null) {
            throw new Error(`Transfer not found by using '${id}' as id`);
        }

        return transfer;
    }

    async create(tranfer: TransferDTO): Promise<Transfer> {
        return await this.transferModel.create(tranfer);
    }

    async delete(tranfer: Transfer): Promise<void> {
        await this.transferModel.findByIdAndDelete(tranfer.id);
    }

    async update(tranfer: Transfer): Promise<void> {
        await this.transferModel.findByIdAndUpdate(tranfer.id, {
            date: tranfer.date,
            amount: tranfer.amount,
            notice: tranfer.notice,
            from: tranfer.from,
            to: tranfer.to,
        });
    }
}
