import {Component, Input, OnInit} from '@angular/core';
import{Transaction} from './transaction';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import{TransactionService} from './transaction.service';

import 'rxjs/add/operator/switchMap';

@Component ( {
  selector: 'transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit{
  @Input() transaction:Transaction;
  constructor(
      private transactionService: TransactionService,
      private route: ActivatedRoute,
      private location: Location
  )
  {}

  ngOnInit() : void {
    this.route.params
      .switchMap((params: Params) => this.transactionService.getTransaction(+params['id']))
      .subscribe(transaction => this.transaction = transaction);
  }

  goBack(): void {
    this.location.back();
  }
}
