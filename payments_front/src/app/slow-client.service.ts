import {Injectable} from '@angular/core';
import { Client } from './client';
import {ClientService} from './client.service';

@Injectable()
export class SlowClientService {
  getClients() : Promise<Client[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(Client), 4000);
    });
  }

  getClient(id: number): Promise<Client> {
    return this.getClients().then(clients => clients.find(client => client.id === id));
  }
}
