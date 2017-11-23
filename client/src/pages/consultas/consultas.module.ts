import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultasPage } from './consultas';

@NgModule({
  declarations: [
    ConsultasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultasPage),
  ],
})
export class ConsultasPageModule {}
