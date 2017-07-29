import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import{Account} from './account';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {
  private accountUrl = 'http://localhost:8091/accounts';


  constructor (private http: Http) {}

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getAccounts() : Promise<Account[]> {
    return this.http.get(this.accountUrl).toPromise()
    .then(response => response.json() as Account[])
    .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getAccount(id: number): Promise<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Account)
    .catch(this.handleError);
  }

  update(account: Account): Promise<Account> {
    const url = `${this.accountUrl}/${account.id}`;
    return this.http
    .put(url, JSON.stringify(account), { headers: this.headers })
    .toPromise()
    .then(() => account)
    .catch(this.handleError);
  }

  create(account: Account) : Promise<Account> {
    return this.http
    .post(this.accountUrl, JSON.stringify(account), { headers: this.headers })
    .toPromise()
    .then(res => res.json() as Account)
    .catch(this.handleError);
  }

  getAccountsByOwner(id: number) : Promise<Account[]> {
    const url = `${this.accountUrl}/by-owner`;
    return this.http.get(url).toPromise()
    .then(response => response.json() as Account[])
    .catch(this.handleError);
  }

}
