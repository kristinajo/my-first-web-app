import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {TransactionSearchService} from './transaction-search.service';
import {Transaction} from './transaction';

@Component({
  selector: 'transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.css'],
  providers: [TransactionSearchService]
})
export class TransactionSearchComponent implements OnInit {
  transactions: Observable<Transaction[]>;
  private searchTerms = new Subject<string>();

  constructor(private TransactionSearchService: TransactionSearchService,
              private router: Router) {}

  search(term: string) : void {
    this.searchTerms.next(term);
  }

  ngOnInit() : void {
    this.transactions = this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(term => term ?
    this.TransactionSearchService.search(term)
    :
    Observable.of<Transaction[]>([])
    )
    .catch(error => {
      console.log(error);
      return Observable.of<Transaction[]>([]);
    });
  }

  gotoDetail(transaction: Transaction) : void {
    let link = ['/tdetail', transaction.id];
    this.router.navigate(link);
  }
}
