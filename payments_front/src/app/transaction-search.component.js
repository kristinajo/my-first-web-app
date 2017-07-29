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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var transaction_search_service_1 = require("./transaction-search.service");
var TransactionSearchComponent = (function () {
    function TransactionSearchComponent(TransactionSearchService, router) {
        this.TransactionSearchService = TransactionSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    TransactionSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    TransactionSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactions = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term ?
            _this.TransactionSearchService.search(term)
            :
                Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    TransactionSearchComponent.prototype.gotoDetail = function (transaction) {
        var link = ['/tdetail', transaction.id];
        this.router.navigate(link);
    };
    return TransactionSearchComponent;
}());
TransactionSearchComponent = __decorate([
    core_1.Component({
        selector: 'transaction-search',
        templateUrl: './transaction-search.component.html',
        styleUrls: ['./transaction-search.component.css'],
        providers: [transaction_search_service_1.TransactionSearchService]
    }),
    __metadata("design:paramtypes", [transaction_search_service_1.TransactionSearchService,
        router_1.Router])
], TransactionSearchComponent);
exports.TransactionSearchComponent = TransactionSearchComponent;
//# sourceMappingURL=transaction-search.component.js.map