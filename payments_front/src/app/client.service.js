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
var ClientService = (function () {
    function ClientService(http) {
        this.http = http;
        this.clientsUrl = 'http://localhost:8091/clients';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ClientService.prototype.getClients = function () {
        return this.http.get(this.clientsUrl).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ClientService.prototype.handleError = function (error) {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    };
    ClientService.prototype.getClient = function (id) {
        var url = this.clientsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ClientService.prototype.update = function (client) {
        var url = this.clientsUrl + "/" + client.id;
        return this.http
            .put(url, JSON.stringify(client), { headers: this.headers })
            .toPromise()
            .then(function () { return client; })
            .catch(this.handleError);
    };
    ClientService.prototype.create = function (client) {
        return this.http
            .post(this.clientsUrl, JSON.stringify(client), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClientService.prototype.delete = function (id) {
        var url = this.clientsUrl + "/" + id;
        return this.http.delete(url)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    return ClientService;
}());
ClientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map