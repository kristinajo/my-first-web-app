import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ClientDetailComponent} from './client-detail.component';
import {ClientsComponent } from './clients.component';
import {HomeComponent} from './home.component';
import {TransactionsComponent} from './transactions.component';
import {TransactionDetailComponent} from './transaction-detail.component';
import {NewTransactionComponent} from './new-transaction.component';
import {AccountsComponent} from './accounts.component';
import {AccountDetailComponent} from './account-detail.component';

const routes : Routes = [
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: ClientDetailComponent
  },
  {
    path: 'tdetail/:id',
    component: TransactionDetailComponent
  },
  {
    path: 'newtransaction',
    component: NewTransactionComponent
  },
  {
    path: 'adetail/:id',
    component: AccountDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
