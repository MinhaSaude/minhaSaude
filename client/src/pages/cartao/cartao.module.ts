import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartaoPage } from './cartao';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    CartaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CartaoPage),
    NgxQRCodeModule
  ],
})
export class CartaoPageModule {}
