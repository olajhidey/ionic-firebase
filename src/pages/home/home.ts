import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectPage } from '../select/select';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  selectPage() {
    this.navCtrl.setRoot(SelectPage)

  }
}
