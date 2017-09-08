import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FichaMedicaPage } from './ficha-medica';

@NgModule({
  declarations: [
    FichaMedicaPage,
  ],
  imports: [
    IonicPageModule.forChild(FichaMedicaPage),
  ],
})
export class FichaMedicaPageModule {}
