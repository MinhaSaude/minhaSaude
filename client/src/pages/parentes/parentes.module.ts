import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentesPage } from './parentes';

@NgModule({
  declarations: [
    ParentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentesPage),
  ],
})
export class ParentesPageModule {}
