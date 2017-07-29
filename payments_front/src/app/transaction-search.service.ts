import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Transaction} from './transaction';

@Injectable()
export class TransactionSearchService {
  constructor(private http: Http) {}

  private transactionUrl = 'http://localhost:8091/transactions/by-account';


  search(term: string): Observable<Transaction[]> {
    return this.http
    .get(`${this.transactionUrl}?accNumber=${term}`)
    .map(response => response.json() as Transaction[]);
  }

}
