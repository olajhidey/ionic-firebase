import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPage } from './select';

@NgModule({
  declarations: [
    SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPage),
  ],
  exports: [
    SelectPage 
  ]
})
export class ItemDetailPageModule {}
