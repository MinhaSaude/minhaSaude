import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the MedUsoContinuoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedUsoContinuoProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello MedUsoContinuoProvider Provider');
  }

updateMedicamento(medicamentos){
  const itemRef= this.afDB.list('medicamentoContinuo/')
  itemRef.push(medicamentos);
}

deleteMedicamento(key){
  const itemRef = this.afDB.list('medicamentoContinuo/')
  itemRef.remove(key);
}


selectByUID(uid){
  return this.afDB.list('medicamentoContinuo/', ref => ref.orderByChild('uid').equalTo(uid));
  
}


}
