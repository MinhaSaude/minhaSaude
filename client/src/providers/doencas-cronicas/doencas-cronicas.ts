import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the DoencasCronicasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoencasCronicasProvider {

  constructor(
    public http: Http,
    private afDB: AngularFireDatabase) {
    console.log('Hello DoencasCronicasProvider Provider');
  }

  update(doencas) {
    const itemRef = this.afDB.list('doencasCronicas/');
    itemRef.push(doencas);
  }

  delete(key) {
    const itemRef = this.afDB.list('doencasCronicas/');
    itemRef.remove(key);
  }
  
  selectByUID(uid) {
    return this.afDB.list('doencasCronicas/', ref => ref.orderByChild('uid').equalTo(uid));
  }

}
