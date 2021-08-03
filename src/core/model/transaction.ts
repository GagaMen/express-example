export abstract class Transaction {
    constructor(
        public id: number,
        public date: Date,
        public amount: number,
        public notice: string,
    ) {}
}
