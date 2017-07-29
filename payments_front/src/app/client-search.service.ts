import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Client} from './client';

@Injectable()
export class ClientSearchService {
  constructor(private http: Http) {}

  private clientsUrl = 'http://localhost:8091/clients/by-surname';


  search(term: string): Observable<Client[]> {
    return this.http
    .get(`${this.clientsUrl}?surname=${term}`)
    .map(response => response.json() as Client[]);
  }

}
