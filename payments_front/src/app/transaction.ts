import {Account} from './account';

export class Transaction {
  id: number;
  amount: number;
  dateOfExecution: Date;
  paymentCode: number;
  paymentPurpose: string;
  referenceNumber: number;
  payFrom: Account;
  payTo: Account;
}
