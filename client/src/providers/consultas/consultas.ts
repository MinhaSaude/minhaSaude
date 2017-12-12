import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ConsultasProvider {

  retorno: any;

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

  update(consulta) {
    const itemRef = this.afDB.object('consultas/' + consulta.uid);
    itemRef.update(consulta);
  }

  delete(uid) {

    this.afDB.list('exames/', ref => ref.orderByChild('uidConsulta').equalTo(uid)).snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        var exame = action.payload.val();
        exame.key = action.key;

        this.afDB.list('exames/').remove(exame.key);

      });
    });

    const itemRef = this.afDB.list('consultas/' + uid);
    itemRef.remove();
  }

}
