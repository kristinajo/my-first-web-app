import {Component, Input, OnInit} from '@angular/core';
import {Account} from './account';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {AccountService} from './account.service';

import 'rxjs/add/operator/switchMap';

@Component ( {
  selector: 'account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit{
  @Input() account:Account;
  constructor(
      private accountService: AccountService,
      private route: ActivatedRoute,
      private location: Location
  )
  {}

  ngOnInit() : void {
    this.route.params
      .switchMap((params: Params) => this.accountService.getAccount(+params['id']))
      .subscribe(account => this.account = account);
  }

  goBack(): void {
    this.location.back();
  }

  save() : void {
    this.accountService.update(this.account)
    .then(() => this.goBack());
  }
}
