import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ParentesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParentesProvider {

  constructor(public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello ParentesProvider Provider');
  }

  select(uid) {
    return this.afDB.list('parentes/', ref => ref.orderByChild('uid').equalTo(uid));
  }

  update(parentes) {
    const itemRef = this.afDB.list('parentes/');
    itemRef.push(parentes);
  }

  delete(key) {
    const itemRef = this.afDB.list('parentes/');
    itemRef.remove(key);
  }
}
