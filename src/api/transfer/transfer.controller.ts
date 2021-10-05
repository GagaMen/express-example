import { Request, Response, NextFunction } from 'express';
import { WrongDataError } from '../../error/wrong-data.error';
import { MissingDataError } from '../../error/missing-data.error';
import { Controller } from '../common/controller';
import { TransferService } from './transfer.service';
import { TransferDTO } from '../../core/model/transfer';
import { injectable } from 'tsyringe';

@injectable()
export class TransferController implements Controller {
    constructor(private transferService: TransferService) {}

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let limit: number | 'NaN' | undefined = Number(req.query['limit']);
            let page: number | 'NaN' | undefined = Number(req.query['page']);

            if (isNaN(limit)) {
                limit = undefined;
            }

            if (isNaN(page)) {
                page = undefined;
            }

            const transfer = await this.transferService.list(limit, page);

            res.status(200).send(transfer);
        } catch (err) {
            next(err);
        }
    }
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transferId: string | null = req.params['transferId'] ?? null;

            if (transferId === null) {
                throw new MissingDataError('No transfer id provided.');
            }

            const transfer = await this.transferService.readByID(transferId);

            res.status(200).send(transfer);
        } catch (err) {
            next(err);
        }
    }
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const date = (req.body as TransferDTO).date ?? null;
            if (date === null) {
                throw new MissingDataError('Date is missing.');
            }

            const amount = (req.body as TransferDTO).amount ?? null;
            if (amount === null) {
                throw new MissingDataError('Amount is missing.');
            }

            const notice = (req.body as TransferDTO).notice ?? null;

            const from = (req.body as TransferDTO).from ?? null;
            if (from === null) {
                throw new MissingDataError('From is missing.');
            }
            if (typeof from !== 'string') {
                throw new WrongDataError('From is not type of string.');
            }

            const to = (req.body as TransferDTO).to ?? null;
            if (to === null) {
                throw new MissingDataError('To is missing.');
            }
            if (typeof to !== 'string') {
                throw new WrongDataError('To is not type of string.');
            }

            const transfer = await this.transferService.create({
                date: date,
                amount: amount,
                notice: notice,
                from: from,
                to: to,
            });

            res.status(200).send(transfer);
        } catch (err) {
            next(err);
        }
    }
    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transferId: string | null = req.params['transferId'] ?? null;

            if (transferId === null) {
                throw new MissingDataError('No transfer id provided.');
            }

            const transferDelta: TransferDTO = req.body as TransferDTO;
            const transfer = await this.transferService.update(transferId, transferDelta);

            res.status(200).send(transfer);
        } catch (err) {
            next(err);
        }
    }
    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transferId: string | null = req.params['transferId'] ?? null;

            if (transferId === null) {
                throw new MissingDataError('No transfer id provided.');
            }

            const transferDelta: TransferDTO = req.body as TransferDTO;
            if (
                transferDelta.date === undefined ||
                transferDelta.amount === undefined ||
                transferDelta.notice === undefined ||
                transferDelta.from === undefined ||
                transferDelta.to === undefined
            ) {
                throw new MissingDataError('Missing data. Please provide a whole transfer object.');
            }
            const transfer = await this.transferService.update(transferId, transferDelta);

            res.status(200).send(transfer);
        } catch (err) {
            next(err);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transferId: string | null = req.params['transferId'] ?? null;

            if (transferId === null) {
                throw new MissingDataError('No transfer id provided.');
            }

            await this.transferService.delete(transferId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
