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
var TransactionService = (function () {
    function TransactionService(http) {
        this.http = http;
        this.transactionUrl = 'http://localhost:8091/transactions';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TransactionService.prototype.getTransactions = function () {
        return this.http.get(this.transactionUrl).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TransactionService.prototype.handleError = function (error) {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    };
    TransactionService.prototype.getTransaction = function (id) {
        var url = this.transactionUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TransactionService.prototype.create = function (transaction) {
        return this.http
            .post(this.transactionUrl, JSON.stringify(transaction), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    return TransactionService;
}());
TransactionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map