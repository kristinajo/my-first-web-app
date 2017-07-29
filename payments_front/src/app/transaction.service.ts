import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Transaction} from './transaction';

@Injectable()
export class TransactionService {
  private transactionUrl = 'http://localhost:8091/transactions';


  constructor (private http: Http) {}

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getTransactions() : Promise<Transaction[]> {
    return this.http.get(this.transactionUrl).toPromise()
    .then(response => response.json() as Transaction[])
    .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getTransaction(id: number): Promise<Transaction> {
    const url = `${this.transactionUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Transaction)
    .catch(this.handleError);
  }

  create(transaction: Transaction) : Promise<Transaction> {
    return this.http
    .post(this.transactionUrl, JSON.stringify(transaction), { headers: this.headers })
    .toPromise()
    .then(res => res.json() as Transaction)
    .catch(this.handleError);
  }
}
