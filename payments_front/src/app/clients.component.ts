import { Component } from '@angular/core';
import { Client } from './client';
import {ClientService} from './client.service';
import {OnInit} from '@angular/core';
import {SlowClientService} from './slow-client.service';
import {Router} from '@angular/router';



@Component({
  selector: 'my-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent  implements OnInit {

  selectedClient:Client;
  clients: Client[];

  constructor(
    private clientService: ClientService,
    private router: Router,
  )
  {}

  getClients(): void {
    this.clientService.getClients().then(clients => this.clients = clients);
  }

  ngOnInit(): void {
    this.getClients();
  }

  onSelect(client: Client) : void {
    this.selectedClient = client;
  }

  gotoDetail() : void {
    this.router.navigate(['/detail', this.selectedClient.id]);
  }

  add(): void {
    let client: Client;
     this.clientService.create(client)
       .then(response => {
         console.log('response', response);
         this.router.navigate(['/clients']);
    })
  }

  delete(client: Client) : void {
    this.clientService
    .delete(client.id)
    .then(() => {
      this.clients = this.clients.filter(c => c !== client);
      if(this.selectedClient === client) {
        this.selectedClient = null;
      }
    }
  )}
}
