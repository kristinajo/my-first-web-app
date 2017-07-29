import { Component } from '@angular/core';
import {Account} from './account';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './account.service';

@Component({
  selector: 'my-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent  implements OnInit {
  selectedAccount:Account;
  accounts: Account[];

  constructor(
    private accountService: AccountService,
    private router: Router,
  )
  {}

  getAccounts(): void {
    this.accountService.getAccounts().then(accounts => this.accounts = accounts);
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  onSelect(account: Account) : void {
    this.selectedAccount = account;
  }

  gotoDetail() : void {
    this.router.navigate(['/adetail', this.selectedAccount.id]);
  }
}
