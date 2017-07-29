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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this.accountUrl = 'http://localhost:8091/accounts';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AccountService.prototype.getAccounts = function () {
        return this.http.get(this.accountUrl).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AccountService.prototype.handleError = function (error) {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    };
    AccountService.prototype.getAccount = function (id) {
        var url = this.accountUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AccountService.prototype.update = function (account) {
        var url = this.accountUrl + "/" + account.id;
        return this.http
            .put(url, JSON.stringify(account), { headers: this.headers })
            .toPromise()
            .then(function () { return account; })
            .catch(this.handleError);
    };
    AccountService.prototype.create = function (account) {
        return this.http
            .post(this.accountUrl, JSON.stringify(account), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AccountService.prototype.getAccountsByOwner = function (id) {
        var url = this.accountUrl + "/by-owner";
        return this.http.get(url).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map