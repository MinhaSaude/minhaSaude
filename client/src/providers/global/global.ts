import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class GlobalProvider {
  constructor(private storage: Storage) {

  }

  async getCurrentUser() {
    const usr = await this.storage.get('user');
    return JSON.parse(usr);
  }

  setCurrentUser(user) {
    this.storage.set('user', JSON.stringify(user));
  }

  setTipoUsuario(tipo) {
    this.storage.set('tipoUsuario', tipo);
  }

  async getTipoUsuario() {
    const tipoUsuario = await this.storage.get('tipoUsuario');
    return tipoUsuario;
  }

  webServiceUrl() {
    return "https://teste-api-ms.herokuapp.com/";
  }
}
