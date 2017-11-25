import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ExamesProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello ExamesProvider Provider');
  }

  select(uid) {
    return this.afDB.list('exames/' + uid);
  }

  getByUidConsulta(uidConsulta) {
    return this.afDB.list('exames/', ref => ref.orderByChild('uidConsulta').equalTo(uidConsulta));
  }

  save(exame) {
    const itemRef = this.afDB.list('exames/');
    itemRef.push(exame);
  }

  update(uidConsulta, exames){
    const examesRef = this.afDB.list('exames/', ref => ref.orderByChild('uidConsulta').equalTo(uidConsulta));
    examesRef.remove();

    const itemRef = this.afDB.list('exames/');
    itemRef.push(exames);
  }

  delete(key) {
    const itemRef = this.afDB.list('exames/');
    itemRef.remove(key);
  }
}
