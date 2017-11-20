import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the AlergiasProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlergiasProvider {
  
    constructor(
      public http: Http,
      private afDB: AngularFireDatabase) {
      console.log('Hello AlergiasProvider Provider');
    }
  
    updateAlergia(alergias) {
      const itemRef = this.afDB.list('alergias/');
      itemRef.push(alergias);


    }
  
    deleteAlergia(key){
      const itemRef = this.afDB.list('alergias/');
      itemRef.remove(key);

    }

    selectByUID(uid){
      return this.afDB.list('alergias/', ref => ref.orderByChild('uid').equalTo(uid));
    }
  
  }
  
