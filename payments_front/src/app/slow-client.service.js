"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var client_1 = require("./client");
var SlowClientService = (function () {
    function SlowClientService() {
    }
    SlowClientService.prototype.getClients = function () {
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(client_1.Client); }, 4000);
        });
    };
    SlowClientService.prototype.getClient = function (id) {
        return this.getClients().then(function (clients) { return clients.find(function (client) { return client.id === id; }); });
    };
    return SlowClientService;
}());
SlowClientService = __decorate([
    core_1.Injectable()
], SlowClientService);
exports.SlowClientService = SlowClientService;
//# sourceMappingURL=slow-client.service.js.map