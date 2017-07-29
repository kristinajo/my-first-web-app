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
var account_1 = require("./account");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var account_service_1 = require("./account.service");
require("rxjs/add/operator/switchMap");
var AccountDetailComponent = (function () {
    function AccountDetailComponent(accountService, route, location) {
        this.accountService = accountService;
        this.route = route;
        this.location = location;
    }
    AccountDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.accountService.getAccount(+params['id']); })
            .subscribe(function (account) { return _this.account = account; });
    };
    AccountDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    AccountDetailComponent.prototype.save = function () {
        var _this = this;
        this.accountService.update(this.account)
            .then(function () { return _this.goBack(); });
    };
    return AccountDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", account_1.Account)
], AccountDetailComponent.prototype, "account", void 0);
AccountDetailComponent = __decorate([
    core_1.Component({
        selector: 'account-detail',
        templateUrl: './account-detail.component.html',
        styleUrls: ['./account-detail.component.css']
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        router_1.ActivatedRoute,
        common_1.Location])
], AccountDetailComponent);
exports.AccountDetailComponent = AccountDetailComponent;
//# sourceMappingURL=account-detail.component.js.map