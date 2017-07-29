import {Bank} from './bank';
import {Client} from './client';

export class Account {
  id: number;
  accNumber: string;
  currentBalance: number;
  bank: Bank;
  owner: Client;
}
