import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ConsultasProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) { }

  select(uid) {
    return this.afDB.list('consultas/', ref => ref.orderByChild('uid').equalTo(uid));
  }

  save(consulta) {
    const itemRef = this.afDB.list('consultas/')
    return itemRef.push(consulta);
  }

  update(uid: string, consulta) {
    const itemRef = this.afDB.object('consultas/' + uid);
    itemRef.update(consulta);
  }

  delete(uid) {

    console.log("id consulta: "+uid);

    const examesRef = this.afDB.list('exames/', ref => ref.orderByChild('uidConsulta').equalTo(uid));
    examesRef.remove();

    const itemRef = this.afDB.list('consultas/' + uid);
    itemRef.remove();
  }

}
