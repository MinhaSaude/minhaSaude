import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class GlobalProvider {
  private currentUser: any;
  constructor(private storage: Storage) {
    this.storage.get('user').then((resp) => {
      this.currentUser = JSON.parse(resp);
    });
  }

   getCurrentUser() {
    return this.currentUser;
  }

}
