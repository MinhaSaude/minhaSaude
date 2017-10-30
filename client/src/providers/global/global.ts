import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class GlobalProvider {
  constructor(private storage: Storage) {

  }

  async getCurrentUser() {
   const usr = await this.storage.get('user');
   console.log(usr);
    return JSON.parse(usr);
  }

  setCurrentUser(user){
    this.storage.set('user', JSON.stringify(user));
  }
  
  webServiceUrl(){
    return "https://teste-api-ms.herokuapp.com/";
  }
}
