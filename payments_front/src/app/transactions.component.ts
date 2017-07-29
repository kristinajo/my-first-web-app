import { Component } from '@angular/core';
import {Transaction} from './transaction';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TransactionService} from './transaction.service';

@Component({
  selector: 'my-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent  implements OnInit {
  selectedTransaction:Transaction;
  transactions: Transaction[];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
  )
  {}

  getTransactions(): void {
    this.transactionService.getTransactions().then(transactions => this.transactions = transactions);
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  onSelect(transaction: Transaction) : void {
    this.selectedTransaction = transaction;
  }

  gotoDetail() : void {
    this.router.navigate(['/tdetail', this.selectedTransaction.id]);
  }

  gotoNewTransaction() : void {
    this.router.navigate(['/newtransaction']);
  }

  add(transaction: Transaction) : void {
    this.transactionService.create(transaction)
    .then(transaction => {
      this.transactions.push(transaction);
      this.selectedTransaction=null;
    })
  }
}
