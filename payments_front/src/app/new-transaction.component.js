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
var common_1 = require("@angular/common");
var transaction_service_1 = require("./transaction.service");
var forms_1 = require("@angular/forms");
var router_2 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var NewTransactionComponent = (function () {
    function NewTransactionComponent(transactionService, route, location, formBuilder, router) {
        this.transactionService = transactionService;
        this.route = route;
        this.location = location;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    NewTransactionComponent.prototype.goBack = function () {
        this.location.back();
    };
    NewTransactionComponent.prototype.buildForm = function () {
        this.transactionAddForm = this.formBuilder.group({
            paymentPurpose: [''],
            paymentCode: [''],
            amount: [''],
            payFrom: [''],
            referenceNumber: [''],
            payTo: [''],
        });
    };
    NewTransactionComponent.prototype.add = function () {
        var _this = this;
        var transaction = this.transactionAddForm.value;
        this.transactionService.create(transaction)
            .then(function (response) {
            console.log('response', response);
            _this.router.navigate(['/transactions']);
        });
    };
    return NewTransactionComponent;
}());
NewTransactionComponent = __decorate([
    core_1.Component({
        selector: 'new-transaction',
        templateUrl: './new-transaction.component.html',
        styleUrls: ['./new-transaction.component.css']
    }),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        router_1.ActivatedRoute,
        common_1.Location,
        forms_1.FormBuilder,
        router_2.Router])
], NewTransactionComponent);
exports.NewTransactionComponent = NewTransactionComponent;
//# sourceMappingURL=new-transaction.component.js.map