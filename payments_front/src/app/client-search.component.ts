import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {ClientSearchService} from './client-search.service';
import {Client} from './client';

@Component({
  selector: 'client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
  providers: [ClientSearchService]
})
export class ClientSearchComponent implements OnInit {
  clients: Observable<Client[]>;
  private searchTerms = new Subject<string>();

  constructor(private ClientSearchService: ClientSearchService,
              private router: Router) {}

  search(term: string) : void {
    this.searchTerms.next(term);
  }

  ngOnInit() : void {
    this.clients = this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(term => term ?
    this.ClientSearchService.search(term)
    :
    Observable.of<Client[]>([])
    )
    .catch(error => {
      console.log(error);
      return Observable.of<Client[]>([]);
    });
  }

  gotoDetail(client: Client) : void {
    let link = ['/detail', client.id];
    this.router.navigate(link);
  }
}
