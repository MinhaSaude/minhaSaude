import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlergiasPage } from './alergias';

@NgModule({
  declarations: [
    AlergiasPage,
  ],
  imports: [
    IonicPageModule.forChild(AlergiasPage),
  ],
})
export class AlergiasPageModule {}
