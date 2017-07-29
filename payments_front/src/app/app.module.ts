import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {ClientDetailComponent} from './client-detail.component';
import {ClientsComponent } from './clients.component';
import {HomeComponent} from './home.component';
import {ClientSearchComponent} from './client-search.component';
import {TransactionsComponent} from './transactions.component';
import {TransactionDetailComponent} from './transaction-detail.component';
import {TransactionSearchComponent} from './transaction-search.component';
import {NewTransactionComponent} from './new-transaction.component';
import {AccountsComponent} from './accounts.component';
import {AccountDetailComponent} from './account-detail.component';


import {ClientService} from './client.service';
import {TransactionService} from './transaction.service';
import {AccountService} from './account.service';

import {AppRoutingModule} from './app-routing.module';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ClientDetailComponent,
    ClientsComponent,
    HomeComponent,
    ClientSearchComponent,
    TransactionsComponent,
    TransactionSearchComponent,
    TransactionDetailComponent,
    NewTransactionComponent,
    AccountsComponent,
    AccountDetailComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: ClientService, useClass: ClientService}, {provide: TransactionService, useClass: TransactionService}, {provide: AccountService, useClass: AccountService}],
})
export class AppModule { }
