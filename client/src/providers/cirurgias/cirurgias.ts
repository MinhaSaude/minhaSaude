import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CirurgiasProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello CirurgiasProvider Provider');
  }

  update(cirurgias) {
    const itemRef = this.afDB.list('cirurgias/')
    itemRef.push(cirurgias);
  }

  delete(key) {
    const itemRef = this.afDB.list('cirurgias/');
    itemRef.remove(key);
  }

  selectByUID(uid) {
    return this.afDB.list('cirurgias/', ref => ref.orderByChild('uid').equalTo(uid));
  }
}
