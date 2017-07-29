"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var client_detail_component_1 = require("./client-detail.component");
var clients_component_1 = require("./clients.component");
var home_component_1 = require("./home.component");
var client_search_component_1 = require("./client-search.component");
var transactions_component_1 = require("./transactions.component");
var transaction_detail_component_1 = require("./transaction-detail.component");
var transaction_search_component_1 = require("./transaction-search.component");
var new_transaction_component_1 = require("./new-transaction.component");
var accounts_component_1 = require("./accounts.component");
var account_detail_component_1 = require("./account-detail.component");
var client_service_1 = require("./client.service");
var transaction_service_1 = require("./transaction.service");
var account_service_1 = require("./account.service");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            client_detail_component_1.ClientDetailComponent,
            clients_component_1.ClientsComponent,
            home_component_1.HomeComponent,
            client_search_component_1.ClientSearchComponent,
            transactions_component_1.TransactionsComponent,
            transaction_search_component_1.TransactionSearchComponent,
            transaction_detail_component_1.TransactionDetailComponent,
            new_transaction_component_1.NewTransactionComponent,
            accounts_component_1.AccountsComponent,
            account_detail_component_1.AccountDetailComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [{ provide: client_service_1.ClientService, useClass: client_service_1.ClientService }, { provide: transaction_service_1.TransactionService, useClass: transaction_service_1.TransactionService }, { provide: account_service_1.AccountService, useClass: account_service_1.AccountService }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map