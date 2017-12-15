import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the MedicosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedicosProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {

  }

  select(uid) {
    return this.afDB.object('medicos/' + uid);
  }

  selectEstadoeEspecialidade(estado) {
    return this.afDB.list('medicos/', ref => ref.orderByChild('estado').equalTo(estado));
  }

  update(medico) {
    //console.log(medico);
    const itemRef = this.afDB.object('medicos/' + medico.uid);
    //delete medico.uid;
    itemRef.update(medico);
  }

}
