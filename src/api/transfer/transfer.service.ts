import { inject, injectable } from 'tsyringe';
import { Service } from '../common/service';
import { Transfer, TransferDTO } from '../../core/model/transfer';
import { TransferRepository } from '../../core/repository/transfer.repository';

@injectable()
export class TransferService implements Service<Transfer> {
    constructor(@inject('TransferRepository') private transferRepository: TransferRepository) {}

    async list(limit = 100, page = 1): Promise<Transfer[]> {
        return await this.transferRepository.find(limit, page);
    }

    async readByID(transferId: string): Promise<Transfer> {
        return await this.transferRepository.findById(transferId);
    }

    async create(transfer: TransferDTO): Promise<Transfer> {
        return await this.transferRepository.create(transfer);
    }

    async update(transferId: string, transferDelta: TransferDTO): Promise<Transfer> {
        const transfer = await this.transferRepository.findById(transferId);

        if (transferDelta.date !== undefined) {
            transfer.date = transferDelta.date;
        }

        if (transferDelta.amount !== undefined) {
            transfer.amount = transferDelta.amount;
        }

        if (transferDelta.notice !== undefined) {
            transfer.notice = transferDelta.notice;
        }

        if (transferDelta.from !== undefined) {
            transfer.from = transferDelta.from;
        }

        if (transferDelta.to !== undefined) {
            transfer.to = transferDelta.to;
        }

        await this.transferRepository.update(transfer);

        return transfer;
    }

    async delete(transferId: string): Promise<void> {
        const transfer = await this.transferRepository.findById(transferId);

        return await this.transferRepository.delete(transfer);
    }
}
