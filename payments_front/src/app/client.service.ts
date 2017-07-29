import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Client } from './client';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ClientService {
  private clientsUrl = 'http://localhost:8091/clients';


  constructor (private http: Http) {}

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getClients() : Promise<Client[]> {
    return this.http.get(this.clientsUrl).toPromise()
    .then(response => response.json() as Client[])
    .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getClient(id: number): Promise<Client> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Client)
    .catch(this.handleError);
  }

  update(client: Client): Promise<Client> {
    const url = `${this.clientsUrl}/${client.id}`;
    return this.http
    .put(url, JSON.stringify(client), { headers: this.headers })
    .toPromise()
    .then(() => client)
    .catch(this.handleError);
  }

  create(client: Client) : Promise<Client> {
    return this.http
    .post(this.clientsUrl, JSON.stringify(client), { headers: this.headers })
    .toPromise()
    .then(res => res.json() as Client)
    .catch(this.handleError);
  }

  delete(id: number) : Promise<void> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.delete(url)
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }
}
