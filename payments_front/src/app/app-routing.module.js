"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var client_detail_component_1 = require("./client-detail.component");
var clients_component_1 = require("./clients.component");
var home_component_1 = require("./home.component");
var transactions_component_1 = require("./transactions.component");
var transaction_detail_component_1 = require("./transaction-detail.component");
var new_transaction_component_1 = require("./new-transaction.component");
var accounts_component_1 = require("./accounts.component");
var account_detail_component_1 = require("./account-detail.component");
var routes = [
    {
        path: 'clients',
        component: clients_component_1.ClientsComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'transactions',
        component: transactions_component_1.TransactionsComponent
    },
    {
        path: 'accounts',
        component: accounts_component_1.AccountsComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: client_detail_component_1.ClientDetailComponent
    },
    {
        path: 'tdetail/:id',
        component: transaction_detail_component_1.TransactionDetailComponent
    },
    {
        path: 'newtransaction',
        component: new_transaction_component_1.NewTransactionComponent
    },
    {
        path: 'adetail/:id',
        component: account_detail_component_1.AccountDetailComponent
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map