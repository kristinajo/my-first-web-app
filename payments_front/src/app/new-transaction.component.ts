import {Component, Input, OnInit} from '@angular/core';
import{Transaction} from './transaction';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import{TransactionService} from './transaction.service';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component ( {
  selector: 'new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent{
  transactions : Transaction[];
  transactionAddForm : FormGroup;

  constructor(
      private transactionService: TransactionService,
      private route: ActivatedRoute,
      private location: Location,
      private formBuilder: FormBuilder,
      private router: Router,
  )
  {}

  goBack(): void {
    this.location.back();
  }

  buildForm(): void {
    this.transactionAddForm = this.formBuilder.group({
      paymentPurpose: [''],
      paymentCode: [''],
      amount: [''],
      payFrom: [''],
      referenceNumber: [''],
      payTo: [''],
    });
  }

  add(): void {
     let transaction = this.transactionAddForm.value as Transaction;
     this.transactionService.create(transaction)
       .then(response => {
         console.log('response', response);
         this.router.navigate(['/transactions']);
    })
  }
}
