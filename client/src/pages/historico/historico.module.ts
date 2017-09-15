import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPage } from './historico';

@NgModule({
  declarations: [
    HistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPage),
  ],
})
export class HistoricoPageModule {}
