import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ExamesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ExamesProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello ExamesProvider Provider');
  }

  select(uidConsulta) {
    return this.afDB.list('exames/', ref => ref.orderByChild('uidConsulta').equalTo(uidConsulta));
  }

  save(exame) {
    const itemRef = this.afDB.list('exames/');
    itemRef.push(exame);
  }

  delete(key) {
    const itemRef = this.afDB.list('exames/');
    itemRef.remove(key);
  }
}
