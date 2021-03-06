"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("./account.service");
var AccountsComponent = (function () {
    function AccountsComponent(accountService, router) {
        this.accountService = accountService;
        this.router = router;
    }
    AccountsComponent.prototype.getAccounts = function () {
        var _this = this;
        this.accountService.getAccounts().then(function (accounts) { return _this.accounts = accounts; });
    };
    AccountsComponent.prototype.ngOnInit = function () {
        this.getAccounts();
    };
    AccountsComponent.prototype.onSelect = function (account) {
        this.selectedAccount = account;
    };
    AccountsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/adetail', this.selectedAccount.id]);
    };
    return AccountsComponent;
}());
AccountsComponent = __decorate([
    core_1.Component({
        selector: 'my-accounts',
        templateUrl: './accounts.component.html',
        styleUrls: ['./accounts.component.css'],
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        router_1.Router])
], AccountsComponent);
exports.AccountsComponent = AccountsComponent;
//# sourceMappingURL=accounts.component.js.map