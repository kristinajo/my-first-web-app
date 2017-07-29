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
var client_service_1 = require("./client.service");
var router_1 = require("@angular/router");
var ClientsComponent = (function () {
    function ClientsComponent(clientService, router) {
        this.clientService = clientService;
        this.router = router;
    }
    ClientsComponent.prototype.getClients = function () {
        var _this = this;
        this.clientService.getClients().then(function (clients) { return _this.clients = clients; });
    };
    ClientsComponent.prototype.ngOnInit = function () {
        this.getClients();
    };
    ClientsComponent.prototype.onSelect = function (client) {
        this.selectedClient = client;
    };
    ClientsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedClient.id]);
    };
    ClientsComponent.prototype.add = function () {
        var _this = this;
        var client;
        this.clientService.create(client)
            .then(function (response) {
            console.log('response', response);
            _this.router.navigate(['/clients']);
        });
    };
    ClientsComponent.prototype.delete = function (client) {
        var _this = this;
        this.clientService
            .delete(client.id)
            .then(function () {
            _this.clients = _this.clients.filter(function (c) { return c !== client; });
            if (_this.selectedClient === client) {
                _this.selectedClient = null;
            }
        });
    };
    return ClientsComponent;
}());
ClientsComponent = __decorate([
    core_1.Component({
        selector: 'my-clients',
        templateUrl: './clients.component.html',
        styleUrls: ['./clients.component.css'],
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        router_1.Router])
], ClientsComponent);
exports.ClientsComponent = ClientsComponent;
//# sourceMappingURL=clients.component.js.map