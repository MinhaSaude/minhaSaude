import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the PacientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacientesProvider {
  constructor(public http: Http,
    private afDB: AngularFireDatabase) {
  }

  select(uid) {
    return this.afDB.object('pacientes/' + uid);
  }

  update(paciente) {
    const itemRef = this.afDB.object('pacientes/' + paciente.uid);
    itemRef.update(paciente);
  }

}
