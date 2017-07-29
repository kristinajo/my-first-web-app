import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component ({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/home" routerLinkActive="active">Home</a>
    <a routerLink="/clients" routerLinkActive="active">Clients</a>
    <a routerLink="/accounts" routerLinkActive="active">Accounts</a>
    <a routerLink="/transactions" routerLinkActive="active">Transactions</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Money transfer web application";
}
