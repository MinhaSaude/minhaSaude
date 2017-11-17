import { GlobalProvider } from './../global/global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the AlergiasProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlergiasProvider {
  
    constructor(
      private http: Http,
      private global: GlobalProvider) {
      console.log('Hello AlergiasProvider Provider');
    }
  
    getAleriaByid(id) {
      return this.http.get(this.global.webServiceUrl() + 'alergias/' + id).map(res => res.json());
    }
  
    removeAlergia(alergia){
      var url = this.global.webServiceUrl() + 'alergias/' + alergia.id;
      return this.http.put(url, alergia).map(res => res.json());
      

    }
  
  }
  
